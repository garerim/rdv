

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { UserProfile } from "@prisma/client";
import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  PencilLine,
  Twitter,
  Upload,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Profile() {
  const [ modification, setModification ] = useState<boolean>(false)
  const [ user, setUser ] = useState<UserProfile>({} as UserProfile)

  const [avatar, setAvatar] = useState(
    "https://media.licdn.com/dms/image/D4E03AQG-g_iHDaxG4g/profile-displayphoto-shrink_200_200/0/1712154553906?e=2147483647&v=beta&t=SSLVdUTkTnebNaRfTkGmAqDLYROmK2ho-4zR6xBn0CM"
  );

  useEffect(() => {
    const fetchImageAndConvert = async (imageUrl: string) => {
      try {
        const response = await fetch(imageUrl);
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        return uint8Array;
      } catch (error) {
        console.error("Erreur lors de la conversion de l'image:", error);
      }
    };

    const handleImageConversion = async () => {
      const imageBytes = await fetchImageAndConvert(
        "https://media.licdn.com/dms/image/D4E03AQG-g_iHDaxG4g/profile-displayphoto-shrink_200_200/0/1712154553906?e=2147483647&v=beta&t=SSLVdUTkTnebNaRfTkGmAqDLYROmK2ho-4zR6xBn0CM"
      );
      const blob = new Blob([imageBytes as BlobPart], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      const stringUrl = url.toString();
      setAvatar(stringUrl);
    };

    handleImageConversion();
  }, []);

  useEffect(() => {
    const user = fetch("/api/userByJWT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenBody: localStorage.getItem("jwtToken") }),
    })

    user.then((res) => res.json()).then((data) => setUser(data))
  }, [])

  return (
    <>
      {!modification ? (
        <div className="flex flex-col gap-[60px]">
          <div className="flex gap-10 items-center justify-between">
            <div className="flex gap-10 items-center">
              <Avatar className="w-[120px] h-[120px]">
                <AvatarImage src={avatar} className="hover:opacity-50" />
                <AvatarFallback className="flex flex-col">
                  Upload avatar
                  <Upload />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                <h2 className="text-lg">{user.email}</h2>
              </div>
            </div>
            <Button className="flex gap-5" onClick={() => setModification(true)}>
              Modifier le profil
              <PencilLine />
            </Button>
          </div>

          <div className="flex gap-10 w-full justify-center">
            <div className="flex flex-col items-center px-4 py-2 bg-secondary rounded-lg cursor-pointer">
              <h1 className="text-lg">Abonnés</h1>
              <p>1.2k</p>
            </div>
            <div className="flex flex-col items-center px-4 py-2 bg-secondary rounded-lg cursor-pointer">
              <h1 className="text-lg">Abonnements</h1>
              <p>1.2k</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-xl w-fit px-4 py-2 m-0 rounded-lg bg-secondary">
              Description
            </h1>
            <p
              className="ml-5"
              dangerouslySetInnerHTML={{ __html: user.description ? user.description : "<p>Aucune description</p>"}}
            ></p>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-xl w-fit px-4 py-2 m-0 rounded-lg bg-secondary">
              Description
            </h1>
            <div className="flex flex-col gap-2 ml-5">
              <div className="flex gap-5">
                <div className="flex items-center">
                  <Globe />
                  <Button variant={"link"} disabled={!user.socialWebsite} onClick={() => window.open(user.socialWebsite as string, "_blank")}>Site internet</Button>
                </div>
                <div className="flex items-center">
                  <Youtube />
                  <Button variant={"link"} disabled={!user.socialYoutube} onClick={() => window.open(user.socialYoutube as string, "_blank")}>Youtube</Button>
                </div>
                <div className="flex items-center">
                  <Facebook />
                  <Button variant={"link"} disabled={!user.socialFacebook} onClick={() => window.open(user.socialFacebook as string, "_blank")}>Facebook</Button>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex items-center">
                  <Twitter />
                  <Button variant={"link"} disabled={!user.socialTwitter} onClick={() => window.open(user.socialTwitter as string, "_blank")}>Twitter</Button>
                </div>
                <div className="flex items-center">
                  <Linkedin />
                  <Button variant={"link"} disabled={!user.socialLinkedin} onClick={() => window.open(user.socialLinkedin as string, "_blank")}>Linkedin</Button>
                </div>
                <div className="flex items-center">
                  <Instagram />
                  <Button variant={"link"} disabled={!user.socialInstagram} onClick={() => window.open(user.socialInstagram as string, "_blank")}>Instagram</Button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1>Vidéo de profil</h1>
                <iframe
                  className="w-[560px] h-[315px]"
                  src="https://www.youtube.com/embed/JK2p-vZNfPA?si=3Q3kL4MOMJhbuY1t"
                  title="YouTube video player"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-xl w-fit px-4 py-2 m-0 rounded-lg bg-secondary">
              Curiculum Vitae
            </h1>
            <ul className="ml-5">
              <a href="#">Télécharger le CV</a>
              <img
                className="w-[200px]"
                src="https://cdn-images.livecareer.fr/images/lc/common/cv-templates/jt/fr/modele-cv-creatif-1@3x.png"
                alt="CV"
              />
            </ul>
          </div>

          <div className="flex flex-col gap-4 mb-[100px]">
            <h1 className="text-xl w-fit px-4 py-2 m-0 rounded-lg bg-secondary">
              Diplômes
            </h1>
            <ul className="ml-5">
              <li>Diploma 1</li>
              <li>Diploma 2</li>
              <li>Diploma 3</li>
            </ul>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
