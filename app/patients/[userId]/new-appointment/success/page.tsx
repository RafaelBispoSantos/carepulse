"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.action";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // Importação do hook

const Success = ({ params }: { params: Promise<{ userId: string }> }) => {
  const [appointment, setAppointment] = useState<any>(null);
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Usando o hook useSearchParams para acessar os parâmetros da URL
  const searchParams = useSearchParams();
  const appointmentId = searchParams?.get("appointmentId") || ""; // Acesso seguro ao appointmentId

  // Resolvendo os parâmetros assíncronos
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setUserId(resolvedParams.userId);
    };

    resolveParams();
  }, [params]);

  // Fetching appointment and doctor data
  useEffect(() => {
    const fetchAppointmentData = async () => {
      if (appointmentId) {
        try {
          const fetchedAppointment = await getAppointment(appointmentId);
          setAppointment(fetchedAppointment);

          const foundDoctor = Doctors.find(
            (doc) => doc.name === fetchedAppointment.primaryPhysician
          );
          setDoctor(foundDoctor);
        } catch (error) {
          console.error("Error fetching appointment:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAppointmentData();
  }, [appointmentId]);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!appointmentId || !appointment) {
    return <p>Invalid appointment ID</p>;
  }

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
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
            Sua <span className="text-green-500">solicitação de consulta</span>{" "}
            foi enviada com sucesso
            {/* Tradução de "Your appointment request has been successfully" */}
          </h2>
          <p>Entraremos em contato em breve para confirmar</p>
          {/* Tradução de "We will be in touch shortly to confirm" */}
        </section>

        <section className="request-details">
          <p>Detalhes da solicitação de consulta:</p>
          {/* Tradução de "Request appointment details:" */}
          <div className="felx items-center gap-3">
            <Image
              src={doctor?.image!}
              width={100}
              height={100}
              alt="médico" // Tradução de "doctor"
              className="size-6"
            />
          </div>
          <p className="whitespace-nowrap">Dr(a). {doctor?.name}</p>
          {/* Tradução de "Dr." */}
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              width={24}
              height={24}
              alt="calendário" // Tradução de "calendar"
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
           Novo Agendamento 
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Success;
