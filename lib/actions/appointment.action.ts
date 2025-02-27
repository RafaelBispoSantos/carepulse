'use server'
import { ID } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async (appoinment: CreateAppointmentParams) => {
    try{
        const newappoinment = await databases.createDocument(
              DATABASE_ID!,
              APPOINTMENT_COLLECTION_ID!,
              ID.unique(),
              appoinment
              
            );
            return parseStringify(newappoinment);
        
    }catch(error){
        console.log(error);
    }

}