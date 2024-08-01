import { pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum('status', ['current', 'completed', 'upcoming']);
export const patternEnum = pgEnum('pattern', ['semester', 'annual']);
export const eventForEnum = pgEnum('event_for', ['all', 'staff', 'student']);
export const grievanceCategoryEnum = pgEnum('grievance_category', ['ACADEMIC', 'HOSTEL', 'MESS', 'INFRASTRUCTURE', 'OTHER']);
export const grievanceStatusEnum = pgEnum('grievance_status', ['PENDING', 'IN_PROGRESS', 'SOLVED', 'COMPLETED']);
export const feeCategoryEnum = pgEnum('fee_category', ['TUITION', 'HOSTEL', 'LIBRARY', 'OTHER']);
export const studentFeeStatusEnum = pgEnum('student_fee_status', ['UNPAID', 'PAID', 'OVERDUE']);
export const paymentMethodEnum = pgEnum('payment_method', ['CASH', 'ONLINE', 'CHEQUE', 'OTHER']);