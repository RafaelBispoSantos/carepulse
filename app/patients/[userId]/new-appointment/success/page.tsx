
import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.action";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type SearchParamProps = {
    params: { userId: string };
    searchParams: { appointmentId?: string };
  };

  const Success = async ({
    params,
    searchParams,
  }: SearchParamProps) => {
    // Acesso aos params e searchParams com o tipo correto
    const userId = params.userId; // Acesso ao userId corretamente
    const appointmentId = searchParams?.appointmentId || "";
  
    if (!appointmentId) {
      return <p>Invalid appointment ID</p>;
    }
  
    const appointment = await getAppointment(appointmentId);
    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);
  
    return (    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />

          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully
          </h2>
          <p>We will be in touch shortly to confirm</p>
        </section>

        <section className="request-details">
            <p>Request appointment details:</p>
            <div className="felx items-center gap-3">
                <Image 
                src={doctor?.image!}
                width={100}
                height={100}
                alt="doctor"
                className="size-6"/>        

            </div>
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
            <div className="flex gap-2">
                <Image 
                src="/assets/icons/calendar.svg"
                width={24}
                height={24}
                alt="calendar"
                />
                <p>{formatDateTime(appointment.schedule).dateTime}</p>
            </div>
        </section>

        <Button variant="outline" className="shad-primary-btn"asChild>
            <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
            </Link>
        </Button>
      </div>
    </div>
  );
};

export default Success;
