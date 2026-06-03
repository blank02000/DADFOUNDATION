# Security Specification: DAD Foundation Firebase Security Rules

This security specification implements an Attribute-Based Access Control (ABAC) system for the DAD Foundation's Firestore collections to satisfy the Zero-Trust security guidelines.

## 1. Data Invariants

1. **Donations:**
   - Public can write (create) a donation to initiate single or monthly payments.
   - Users/Public CANNOT read, update, or delete other people's donation documents.
   - Only administrative workers can view, manage, and audit donations.
2. **Volunteers:**
   - Any authenticated user can create their own volunteer profile.
   - A user can read/update their own volunteer application profile.
   - Only administrative accounts can review, approve, reject, or manage all volunteer profiles.
3. **Events:**
   - Public can read events.
   - Only administrative accounts can create, update, or delete events.
4. **Blogs:**
   - Public can read blog posts.
   - Only administrative accounts can create, update, or delete blog posts.
5. **Newsletter:**
   - Public can read/write their own newsletter subscriptions to guarantee simple onboarding.

---

## 2. The "Dirty Dozen" Payloads (All Returns PERMISSION_DENIED)

Below are the 12 malicious payloads that are strictly blocked by the security architecture.

### Payload 1: Privilege Escalation (Self-Appointing Admin Role)
* **Target:** `/volunteers/malicious_user`
* **Intended Exploit:** Setting volunteer profile status to "approved" and assigning hours to bypass evaluation.
* **Payload:**
```json
{
  "userId": "attacker_id",
  "name": "Attacker",
  "email": "attacker@gmail.com",
  "phone": "555-5555",
  "status": "approved",
  "hoursContributed": 1000,
  "appliedAt": "2026-06-01T00:00:00Z"
}
```

### Payload 2: Poisoning ID Strings with Recursive Buffer Blobs
* **Target:** `/donations/PROJECT_POISON_9999999999999999999999999999`
* **Intended Exploit:** Injecting massive ID strings of garbage characters to causing database wallet drainage.
* **Result:** Defended by `isValidId(donationId)` checking length (<= 128) and matches patterns.

### Payload 3: Spoofing Foreign Identity (Donation Hijack)
* **Target:** `/donations/some_id` (by unauthorized caller trying to overwrite a donation details field)
* **Payload:**
```json
{
  "donorEmail": "target_victim@gmail.com",
  "amount": 0.01,
  "paymentStatus": "success",
  "type": "one-time"
}
```

### Payload 4: Overwriting Created-At Timestamps
* **Target:** `/donations/any_id` updating `createdAt` field retroactively.
* **Exploit:** Stealing administrative timeline integrity.
* **Payload:**
```json
{
  "createdAt": "2010-01-01T00:00:00Z"
}
```

### Payload 5: Out of Bound Numeric Ranges (Denial of Wallet)
* **Target:** `/donations/exploit_neg`
* **Payload:**
```json
{
  "amount": -500000,
  "donorName": "Poison Donor",
  "donorEmail": "exploit@gmail.com",
  "paymentStatus": "pending",
  "type": "one-time"
}
```

### Payload 6: Anonymous Write to Core Blogs
* **Target:** `/blogs/unauth_blog`
* **Payload:**
```json
{
  "title": "Malicious Phishing Attack Article",
  "content": "Phished content link",
  "category": "Medical Support"
}
```

### Payload 7: Update Immutable Fields
* **Target:** `/donations/donation_1` (where attacker updates `campaignId` of existing donation)
* **Payload:**
```json
{
  "campaignId": "hacked_campaign"
}
```

### Payload 8: Read Sensitive PII of Another Donor
* **Target:** GET query on `/donations/donation_1` by unauthorized other user.
* **Defense:** Blocked. Only administrative accounts can read.

### Payload 9: Skip Operational Steps / Direct Operational Update
* **Target:** `/volunteers/vol_1` (updating hours contributed without admin validation)
* **Payload:**
```json
{
  "hoursContributed": 999
}
```

### Payload 10: Email Verification Spoof (No Verification Admin Attack)
* **Target:** Attacking administrative endpoints with unverified emails.
* **Defense:** Security rules validate `request.auth.token.email_verified == true`.

### Payload 11: Schema Overflow (Adding Extraneous Key Payload)
* **Target:** `/newsletter/sub_1`
* **Payload:**
```json
{
  "email": "mal@gmail.com",
  "subscribedAt": "2026-06-01T00:00:00Z",
  "ghostField": "malicious注入"
}
```

### Payload 12: Terminal State Overwrite
* **Target:** Overwriting donation record with positive statuses after failure.
* **Payload:**
```json
{
  "paymentStatus": "success"
}
```

---

## 3. The Test Runner Reference
All operations undergo complete payload checking and are locked under security validators.
See `/firestore.rules` for full implementation details.
