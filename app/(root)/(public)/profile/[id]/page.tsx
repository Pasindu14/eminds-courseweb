import { fetchStudentDetails } from "@/server/actions/student.actions";
import { Bebas_Neue } from "next/font/google";
import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { fetchBadgesByStudentAutoId } from "@/server/actions/badge.actions";

const jost = Bebas_Neue({ weight: "400", subsets: ["latin"] });

const Profile = async ({ params }: { params: { id: number } }) => {
  const studentDetails = await fetchStudentDetails(params.id);
  const badges = await fetchBadgesByStudentAutoId(params.id);

  const image = badges[0].image_name;

  return (
    <div
      className={`bg-[url('/background.svg')] bg-cover bg-no-repeat bg-center w-full h-full ${jost.className}`}
    >
      <div className="container mx-auto p-8">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="flex mb-4 items-start justify-center text-black md:text-7xl font-semibold mt-4">
            {studentDetails.name}
          </h1>
          <div className="p-4 text-black">
            <Image
              src={
                `https://eminds.com.au/coursewebfiles/downloadfiles.php?id=` +
                image
              }
              alt="profile image"
              width={0}
              height={0}
              sizes="50vw"
              style={{
                width: "35vw",
                height: "auto",
                backgroundColor: "rgba(255,255,255, 0.2)",
                padding: "50px",
              }}
              priority
            />
          </div>

          <h1 className="flex mb-4 items-start justify-center text-black md:text-4xl font-semibold mt-4 ">
            Badges
          </h1>
          <Separator className="mb-4 w-[15vw]" />

          <div className="flex items-center justify-center gap-2">
            {badges.map((badge: any) => {
              return (
                <div key={badge.auto_id}>
                  <Image
                    src={badge.courses.badge}
                    alt="profile image"
                    width={0}
                    height={0}
                    sizes="50vw"
                    style={{
                      width: "15vw",
                      height: "auto",
                      backgroundColor: "rgba(255,255,255, 0.2)",
                      padding: "50px",
                    }}
                    priority
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
