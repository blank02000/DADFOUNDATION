/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DonationType, VolunteerStatus } from './types';

export const SAMPLE_TEAM = [
  {
    name: 'Dr. Sarah Jenkins',
    role: 'Executive Director',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCWDbuT_obGKrKgeYAupWknLmAmybmBlGGcegtbAhBUs7A3wog2iKn8P2fCwsXrDs881rPNWj8NlnH1554YwuTZjl3rdwqk5UTRdhuoqWTxTje5zm4IrIdjf4xExEQFoN6YFMBncG_IyC5fWs7qcVA3AfTuVVdi0qcLx-SvxKtlFvuRYUMP2FDBShdCiNL-Y0uGMqTOpyh3sGDAHIn5c37BdDSw_fjGnL_FCp8v4-KCxLkwtYYLBLXoGfPS4P9hPvIkC127DzKdwXX'
  },
  {
    name: 'Marcus Thorne',
    role: 'Head of Operations',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9TCPFFZrahf0CH4p_q_WdNCJjM8GVva3R9HWVDc0jeJCE4lOTx_ARPEsYdr6Gry3yqCSfxYuB6mzk7hqWfSBZd7YmmMW4HolSYAGrzStBUK0IbjHpdrFaFmvKBq-BHDI-z54EmlweXVGxcJanUaNw2auhY5eRbiK8_UH654BvT2Ocy3NuobajRexeFfylHhmMuRg7wNkHLhJ1a81j9mlYC8eKmHNKkgPxWMnpzAz_eBw0uYqgKTIJ_WR_xH5i1_swzi2w0aStxYMn'
  },
  {
    name: 'Dr. Anita Roy',
    role: 'Chief Medical Officer',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQdRphudrXn3NDRFqe2Sk-mlG80QYgUMUQZo0UO3vaFDeNaPTbyKhxCY5x6BqthKGiHkXwLA8gi8KzVZJBbpMGeVsmySqdftzUyEeFlDNA4Z6sg9gPSZOuGwBmnUz21LWa7csM5jd3aEtQTSLeuzHufWgysa-1kzAZVFwhQNvUzf7yNq5N5PiR_z3DrYZ99UudTN-MWj728JHVhmpUsHTyeAaYEJa4BePtYcuGb2bAf3dwyKP7q1Q3vHKB2ui5AVNZ6m-v4Bt7Jb61'
  },
  {
    name: 'David Chen',
    role: 'Board Chairman',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAsS7O-61y5zIGbmJEuL8NWs-s_NE7IPGVh6R5AI7ULgABKomyKmRPKGEsOuUrMLD7i2MJHoV4ZO-ct5HTqujyvLWU6Z6MQbRNAsXl3aTje1i4u8PdxE31wMisHQ5AXqFPOubRA_7c4b151LjqHbthibVQUveZ5QIUZu5oa9iUDegb_JHEtmpq0jFHi2B6KTGE7W7m4b2oqmbUU9h_HMHNPbAKNifWU0YJL39WG0_wF0xi6BrTk98uxAFcu0Wgu9X_rZ1MgKJy2wPK'
  }
];

export const SAMPLE_SERVICES = [
  {
    title: 'Medical Support',
    description: 'Comprehensive primary care diagnostics, treatment, and on-going chronic condition response programs.',
    details: 'Our clinics offer 24/7 essential services, including immunization, preventive medicine checklists, and free medical diagnostic operations for families.',
    icon: 'Stethoscope',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_OBpuilGo8EIeATsSiG7GFIZadlJVALbg_iEnC1cKxWK7ogxIOC64AvG6C6RQlS8o_QitMwfkDVs06VIK8MYY7KDx_2cPTUtQM3FetGIiMIFgSZMbLpwArp9ayuLK5MG7QbaIK0HL-BO7Oab7ZiSLjugZavRdc2-m5-y5p3f1PXXmbPmn1kPgB7qfG53RmO1OYWuG-IQf1Yhy6Sz5QbSRhd7W-7DBbuoGrFHiALubP-akSXxPUGQ_ttFYkBvMbKcn9Qwc5udAEXqI',
    color: 'emerald'
  },
  {
    title: 'Surgical Support',
    description: 'Life-changing elective, corrective orthopaedic and reconstructive surgical therapies for children.',
    details: 'Advanced surgical care managed by visiting experts in state-of-the-art facilities, completely cost-free for families under strict income criteria.',
    icon: 'Activity',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPpUZo_TDBqrsEu8cBUVL2htSH3yHYJpVtQ-Ff6m3FNDCWm3sTVloPrl0p1KdfQPdk4-gCbslLIwq50MFXW0yMaR97hNOa588ruvX5jqG0NT2ReLhWev0WMl1GTuupqqSncZBH03jlj2VTcczfsIWlFkfAMpFFdz5hpKoqdHlRhWDmPUvuEYf0CmgGg87gEQexUrG1OfDylSL0dHCJlru2WCxsFJVVxBWKUnxvUSezkEprhff9MPPzZFHfcNEnQDxLzIqxwxrUDSRI',
    color: 'blue'
  },
  {
    title: 'Therapy & Rehab',
    description: 'Specialised physical and occupational therapists offering progressive sensory developmental treatments.',
    details: 'Individualised physiotherapy routines utilizing balance, sensory integration chambers, and specialized aids for differently abled children and adults.',
    icon: 'Sparkles',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN5l7nBq3bg2ZMVunwtPjt50nyBjf3wy3SMctnmzuH43lQHijQjVu5Op3Uq8VDW_lz8cT9LhdQRg4JI5k-or6lHDcbjgPSDNzSvq-jyDtkWULhwR9BjLgLWqgzfHkhA-ivDW_Lp0so6krdkKptPMvEsYTOJbX-03W6o_AtkaCvfiiD_Es3Og6q0Kg-SakcmyOdkVAGEZI5m0MaUByZ9UXK9WG27JrNpYaEmB0AbAuLdlHXrEQfFuINmHqboYDqVq1gc1hjHHWQBdUZ',
    color: 'indigo'
  },
  {
    title: 'Emotional Wellness',
    description: 'Counseling, group therapies, and caregiver stress monitoring networks in inclusive safe harbors.',
    details: 'We support the wholesome social emotional mental wellness of families via sharing group sessions, trauma response guidance, and stress relief frameworks.',
    icon: 'Heart',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLzFJhKEkImbEJxsnd60_9hQVGSTxriUC2p3jwox92mytyAOHwP5iGJZ50Lh1VaZy-1JS5pl0ZGaaIXLFScoV_6XPVZJNBP8pf5JIZ93qY7UViWBiHCNmJOxe1vwPfImUdqbtBfg9JsYgrxJ8Hy8ihqcEJXqIsIhLBOoIf6qqC6ZRVOXqZwlj1vak1aJIDzpZo8lUUQBNGthB2QVke9f98Sr8frHL4wGpEOok7XGemZRcfUr2Dwq1xpnXNmxXdlCMBBy02cOl4E0SJ',
    color: 'rose'
  }
];

export const SAMPLE_BLOGS = [
  {
    id: 'blog1',
    title: 'The Complete Guide to In-Home Healthcare Management',
    summary: 'Learn how to coordinate professional care, manage medications, and create a supportive environment at home.',
    content: `Providing in-home care for a family member with physical or mental disabilities can be highly rewarding, but requires planning and structured routines. 

### 1. Establish Structured Routines
Consistency is critical for physical therapy and medical tracking. Ensure that care plans are written and visible.

### 2. Physical & Occupational Setup
Organise critical aids (grab bars, accessible tables, posture supports) symmetrically. 

### 3. Coordinate Specialists
A multidisciplinary care schedule—including physiotherapists, doctors, and wellness counselors—leads to excellent clinical outcomes.
Keep precise history logs on milestones!`,
    category: 'Healthcare',
    authorName: 'Dr. Sarah Jenkins',
    authorId: 'admin1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeoRs6SnykewVsXw_qRZZ-yKR7W23O1T5NuyFXosQbndTbma6suhmVSMqIN8GHvupZs_Nq-NIvouXfvhRPFy75n-ugY6q3zUqIrD346PC-AEo-rpohtcFUXUshsZ82MubrqroSCip0FYVVZK_FxJ58xlEgTOdwlEgzutOfFTXh4hTqplsDF__Aol6jXRaYW_ow-dCE42qBosltdU132UOweRZ3W0FDzJ4sYFv-Rbn7tXLnwtas94AzOG_lhooDnwtj2zSOZ-ZO-CYM',
    createdAt: new Date('2026-05-15')
  },
  {
    id: 'blog2',
    title: 'Daily Caregiver Checklist & Medication Tracker',
    summary: 'Printable forms and schedule recommendations designed by medical professionals to help you stay organized during intensive home care routines.',
    content: `Taking care of the caregivers is just as critical as supporting patients. Over 60% of caregivers experience mental burnouts due to uncoordinated roles.

### Core Tracking Pillars:
- **Vital signs** (blood pressure indices, sugar profiles, target ranges).
- **Physical movement logs** (range of motion therapy durations).
- **Emotional check-ins** (mindfulness journaling times).

Download our resources inside the dashboard!`,
    category: 'Caregiver Support',
    authorName: 'Marcus Thorne',
    authorId: 'admin2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6eNoL2EehtWbcrXOoHzt0TRZVFlzNJJmPUL-6XCl0ld6IFXiqRq9f2nmEgtbXfYPyd5CFmMbf1q127fxuvPGZQnbpEeIvIlk-C1f3NwmZJUbmr0Mj3UdTbjfOcWp9SBwLbC9IhL5iqk8zBRC72cXYw0gZmSZ974ALe76no-MwXQu9Dvg_m2cNko5tWgOEoIUPABhjpSwuXXnGkSD2zgurX5VtQBimLU3huG9PfGdphdt4BjaWFXRjvCK76kOTQjKz8CIscxxVYVTH',
    createdAt: new Date('2026-05-20')
  },
  {
    id: 'blog3',
    title: 'Survivor Stories: Navigating Post-Surgery Recovery',
    summary: "Real-life accounts of families who overcame massive developmental disabilities through DAD Foundation's clinical support network.",
    content: `Aisha's story stands as a proof of what can be accomplished when community compassion combines with high-level clinical medicine.

### Overcoming orthopaedic hardships:
Being diagnosed with rigid clubfoot and posture instability, Aisha underwent structural corrective surgeries funded globally by anonymous donors. Today, she participates in school sports, proving that physical therapy builds true independence!`,
    category: 'Community',
    authorName: 'Dr. Anita Roy',
    authorId: 'admin3',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdReygfZq6LGUDCcD5my3ZsBAuDSAJA5weFL59k9d_yrtcty5KHxH6XmnlKPWVJN4iPouVK22dAPkw13DgnB1H88kZuOoq35bU_tANTrA_X6XEBRsKnPGEJTGTu0ZqFU5Zw3dowCHX3gWNInyctfDPEmZjSFJpJKlKLZEqbDcPnKSw-_DuojSUP1QPm3pQgtFg-F6igcGSpyMBXt6-ocDNje1Az9trARFHkOUKp752ZbCODVmohr7b1_OEyuX68dmKM5O4oX4xJvH2',
    createdAt: new Date('2026-05-28')
  }
];

export const SAMPLE_EVENTS = [
  {
    id: 'ev1',
    title: 'Differently Abled physical Therapy Camp',
    description: 'A free screening and personalized physiotherapy advice workshop led by expert physical therapists.',
    date: '2026-06-18',
    time: '09:00 AM - 04:00 PM',
    location: 'Community Hall, Sector-4, Nariman Point',
    category: 'Therapy & Rehab',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNASX8ZqHT5TpnYZr6tgLT6BfI1aCWP0dzF7BX7r_qPhgdLX4Hx5iuq2qoimDmNrlxVnSbIv-K3kBm1Oomu575dOfoBjKLRgqFYlOiuYTJ84YMZuMems-asmhGAaHZIa3k9M6s3w88KqpJVhyohV8sA5P6KujdALci8IFJCYjg7oASH-ZAnzmKhi7ljlnRk6I835Tcy7MNrP8wrRa63VNgk8FRkdzF8XVOVOQs78RZDKoGCCkA0Mrh1N4c4HZNTDRPCLtvFXm9mP5H',
    registrants: ['volunteer@gmail.com'],
    capacity: 50,
    createdAt: new Date()
  },
  {
    id: 'ev2',
    title: 'Maternal Healthcare & Pediatric Checkup',
    description: 'Providing comprehensive pediatric development screenings and maternal consultation.',
    date: '2026-06-25',
    time: '10:00 AM - 03:00 PM',
    location: 'DAD Foundation Healthcare Wing, Mumbai',
    category: 'Healthcare',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNHb__Uauk08UuUTI3Wbxu9oTcqiTKOFtUQZLJw0HiYRKS84Ujp3A2GwC1zU8FZHTw601UECtcqNEqJKnXlexj75dWZj5ajRUl1r9pqZZkjND3UEUGVRyXC94w5Y-_xGgBQKM0b4xuF05v43NWccwD3mcx6eCyaP0SLluKQEw75iSNXZNpUmomSwe4Q8wxqzkimXMIooYAPvtFbgXaFu_BtQCAKFKhYZ_ZqjpK6vShHPfcPEGt440T6WxAtJIIGo7v2OM79nFKmDfS',
    registrants: [],
    capacity: 120,
    createdAt: new Date()
  }
];

export const SAMPLE_STORIES = [
  {
    title: "Aisha's New Beginning",
    context: 'Healthcare & Corrective Rehab',
    quote: '"The DAD Foundation did not just give me medical orthotics; they gave me my childhood back."',
    description: 'Aisha was diagnosed with rigid post-injury posture limitations. Through corrective therapies and physical rehabilitation at DAD Foundation, she overcame clubs of restriction and stands tall today with true independence.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzl2Gcwj2jZrgDxa1kwERq_nTaDbj7IEsCEZ6-goabW9_T9b8A4TycA5o8XqnAfKQukkbH7YVh_3cnzsK090fmx9qeSXquDEXIbC4kulVFJVF3PBV9_Yf2J9lz10LLJvuMr7cjyXbQ0BvPJl-fUGogmjQH7J-FT2WUp9hpuR4chtfDB5XFYNTUrym5oVaCZzL0cwpTozeKkCdM_0PYsBf6j3lD4jEBCSJwd7TXvfLc3yf-eMSDlc76gLq94Q395Y9vJ0OyxbAl4vLe'
  },
  {
    title: 'Supporting Our Seniors',
    context: 'Dignity Care Network',
    quote: '"The medical mobile van is a beacon of hope arriving in our village every week without fail."',
    description: 'Bringing diagnostics and elder-care experts straight to rural regions. Seniors with orthopaedic and post-stroke hardships receive consistent therapy sessions, creating an ecosystem of support.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE0r09folRqhS2JafORWOvHe6BB4EtJsOhQ9x9xm_TO6zraVj_Xpp3f4xpF0yyHA1PybfjW59t1SS5gEHO-eDFaTf_zmYCSCZkSmAB0TfIjXCUSPJzLLpjkWBVDOXf3VLkMtiRvdidZ2Vlbm4b9eI-tFUBRLkBeAHukGm7I6ID_i3JXGA-r3WYxCr69lizmLTDKXVww9puTk-41bh7KWiTEwa74jKaEo9vbMNPSyfgixvEExUu1s71FL4beghbnHQzxAf5Ok8VNrzA'
  }
];

export const SAMPLE_GALLERY = [
  {
    title: 'Mobile Medical Van setups',
    category: 'Clinics',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_2XdlodXLBUcvwruRbUzxSVUEBJtcqegV4urPWZ5aHO_wBm4fpyvToPu2I5LdW25zhz-02IrfPmqWVZUlMbf6pIrOd7yXrBl5gKIrREP93PTWNQ2kCOiBMn-bjNYfQHiqi41O9II08LeWlBYSvOvdUnzWnKpWJjLHH5EgVuv4krNbLDR9r4bFEd_b3JL1E3h4UjLbsEJ-9qH7wCPSxYtk81HGNgwo5liLlWp8JN96eQwZF5Dv0DxLq-DNez_5UlfeqFb4F2rZWLvD'
  },
  {
    title: 'Pediatric diagnostics lab work',
    category: 'Diagnostics',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBENERiJWJn6dDA5NlPJtBKUBFNxWXSy8fC5RWMemNkA0y_whmORg3YEsPigQf1yBUJq0VO2ehflxPvJr1ik0nRu1qWNJc6mUmwvvFIRmXc3wqDh92F5WURT2q8N05t_SGWp_jM2x5BtS7KnPV4IWW0w4SqNY1Xw2ZaQ6kNjjRCG0Cv2mS6NBQeqoaV_USRzw7kd6TdYYWtUnUj-mJ5ZibR-GDtcapc1h3U7QFnBTYfRLU19PXvpJsmRKnmxg3VG9F2KEAU9dUY81TQ'
  },
  {
    title: 'Staff collaboration strategy focus',
    category: 'Governance',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPjo_LWL1FnEbqThIUriMhE3Cl-Er0Aiu37h6fhZ9TN41w-9WeIef_oWz1nUD7Cnuum3H_ycewkSnerKsu_uSzeTkATustclMOOdUQbnYV9DNQ56XGHnllmfZEezXPGq3xQnpRfw2lLjPCUfwLPVlyLc8YyM7PJBtCmc5HNKRGCn1Hyt6VCT3OiCi1vUBcOdsRhLO5knIwFZWf-q0vuvKjjzTfZkMQXBwMmeArN_bZaDzmuragwbw6rbep9cm0qs7fCOUo8QkvyLMZ'
  },
  {
    title: 'Pure Drinking filtration camps',
    category: 'Social outreach',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtCwU1ThO7Pmo_5Te5IJP7vxXMSFoAq-JtM2lGBUYjxRJdYyhraaTSQDp0-CODu2K02rhMGLVxMaa_fiAl1jspCs7XC4CAcrlQFbAJoyWWGsraQRAm0sBhsolJRbsnrC_F0aj7nSte8Hy8wWJaZsQJWd9RDOzGwHTWtYMLF7ZyGEPz3_oyFTnm2tiOznecErZb_B9wK2yYeggUbi0xHRiYlzE6W_OiBOGOujUGtnbl6Wg95B_52rk0DiyJKkQqFU333v2zGDMcKq65'
  }
];
