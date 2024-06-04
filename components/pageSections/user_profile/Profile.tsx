import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [description, setDescription] = useState<string>(
    "Placeholder description.Placeholder description.Placeholder description.Placeholder description.Placeholder description.Placeholder description."
  );

  const disponibilites = {
    jour: "Lundi",
    horaires: "8h-12h",
    prixConsult: "25€",
  }

  return (
    <>
      <div className="flex flex-col gap-[60px]">
        <div className="flex gap-10 items-center justify-between">
          <div className="flex gap-10 items-center">
            <Avatar className="w-[120px] h-[120px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>username</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">Shadcn</h1>
              <h2 className="text-lg">mathis.sportiello@gmail.com</h2>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center px-4 py-2 bg-secondary rounded-lg cursor-pointer">
              <h1 className="text-lg">Abonnés</h1>
              <p>1.2k</p>
            </div>
            <div className="flex flex-col items-center px-4 py-2 bg-secondary rounded-lg cursor-pointer">
              <h1 className="text-lg">Abonnements</h1>
              <p>1.2k</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl w-fit px-4 py-2 m-0 rounded-lg bg-secondary">
            Description
          </h1>
          <p
            className="ml-5"
            dangerouslySetInnerHTML={{ __html: description }}
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
                <Button variant={"link"}>Site internet</Button>
              </div>
              <div className="flex items-center">
                <Youtube />
                <Button variant={"link"}>Youtube</Button>
              </div>
              <div className="flex items-center">
                <Facebook />
                <Button variant={"link"}>Facebook</Button>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex items-center">
                <Twitter />
                <Button variant={"link"}>Twitter</Button>
              </div>
              <div className="flex items-center">
                <Linkedin />
                <Button variant={"link"}>Linkedin</Button>
              </div>
              <div className="flex items-center">
                <Instagram />
                <Button variant={"link"}>Instagram</Button>
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
            <img className="w-[200px]" src="https://cdn-images.livecareer.fr/images/lc/common/cv-templates/jt/fr/modele-cv-creatif-1@3x.png" alt="CV" />
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
    </>
  );
}
