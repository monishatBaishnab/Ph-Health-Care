import { z } from "zod";
const doctorSchema = z.object({
  name: z.string().max(255, { message: "Name must be at most 255 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  contactNumber: z.string().min(10, { message: "Contact number must be at least 10 digits long" }),
  address: z.string(),
  registrationNumber: z.string(),
  experience: z.number().nonnegative({ message: "Experience must be a non-negative number" }),
  gender: z.enum(["MALE", "FEMALE"], { message: "Invalid gender" }),
  appointmentFee: z.number().positive({ message: "Appointment fee must be a positive number" }),
  qualification: z.string(),
  currentWorkingPlace: z.string(),
  designation: z.string(),
  averageRating: z.number().optional(),
});

const createDoctorSchema = z.object({
  password: z.string(),
  doctor: doctorSchema,
});

export const UserSchemas = {
  createDoctorSchema,
};
