/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum PaymentMethod {
  STRIPE = 'Stripe',
  PAYPAL = 'PayPal',
  RAZORPAY = 'Razorpay',
}

export enum DonationType {
  ONE_TIME = 'one-time',
  MONTHLY = 'monthly',
}

export enum VolunteerStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface Donation {
  id: string;
  amount: number;
  type: DonationType;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  campaignId: string;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  taxReceiptNumber?: string;
  createdAt: any; // Firestore Timestamp or Date ISO string
}

export interface Volunteer {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  skills: string;
  areasOfInterest: string;
  status: VolunteerStatus;
  appliedAt: any;
  hoursContributed: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  registrants: string[]; // List of registrant emails
  capacity: number;
  createdAt: any;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  authorName: string;
  authorId: string;
  image: string;
  createdAt: any;
}

export interface NewsletterSub {
  email: string;
  subscribedAt: any;
}
