'use client';

import { useEffect, useState } from 'react';
import AppointmentForm from '@/components/forms/AppointmentForm';
import { getPatient } from '@/lib/actions/patient.actions';
import Image from 'next/image';
import Link from 'next/link';

const NewAppointment = ({ params }: { params: Promise<{ userId: string }> }) => {
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState<string>("");

  // Resolvendo os parâmetros assíncronos
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setUserId(resolvedParams.userId);
    };

    resolveParams();
  }, [params]);

  // Fetching patient data
  useEffect(() => {
    if (!userId) return;

    const fetchPatient = async () => {
      try {
        const fetchedPatient = await getPatient(userId);
        setPatient(fetchedPatient);
      } catch (error) {
        console.error("Error fetching patient:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [userId]);

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  // No patient found state
  if (!patient) {
    return (
      <div className="flex h-screen justify-center items-center">
        <p>Patient not found</p>
      </div>
    );
  }

  // Render the form when patient is loaded
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id}
          />

          <p className="copyright mt-10 py-12">© 2025 CarePulse</p>
        
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );

};
export default NewAppointment;
