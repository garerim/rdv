import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { UserProfile } from "@prisma/client";
import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState, useRef, use } from "react";

export default function Profile({ user }: { user: UserProfile | undefined }) {
  const [profilUnderModification, setProfilUnderModification] = useState(false);
  const [userTemp, setUserTemp] = useState<UserProfile>({} as UserProfile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    fetch("/api/users/profil", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenBody: localStorage.getItem("jwtToken"),
        user: userTemp,
      }),
    }).catch((error) => {
      console.error("Error:", error);
    });
    window.location.reload();
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setUserTemp((prevUser) => ({ ...prevUser, avatar: base64 }));
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <>
      <Button
        onClick={() => {
          setUserTemp(user as UserProfile),
            setProfilUnderModification(!profilUnderModification);
        }}
      >
        Modify
      </Button>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {!profilUnderModification ? (
        <>
          <div className="flex flex-col gap-[60px] pb-[120px]">
            <div className="flex gap-10 items-center justify-between">
              <div className="flex gap-10 items-center">
                <div className="w-[120px] h-[120px]">
                  {user && user.avatar ? (
                    <>
                      <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </>
                  ) : (
                    <Skeleton className="h-[120px] w-[120px] rounded-full" />
                  )}
                </div>
                <div className="flex flex-col">
                  {user ? (
                    <>
                      <h1 className="text-2xl font-bold">
                        {user ? user.firstName : "Unknown"}{" "}
                        {user ? user.lastName : "Unknown"}
                      </h1>
                      <h2 className="text-lg">
                        {user ? user.email : "Unknown"}
                      </h2>
                    </>
                  ) : (
                    <>
                      <Skeleton className="h-8 w-[250px] mb-1" />
                      <Skeleton className="h-5 w-[300px] mt-1" />
                    </>
                  )}
                </div>
              </div>
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

            <div className="flex flex-row gap-4 items-center">
              <p>{user && user.nbVotesPour ? user.nbVotesPour : 0} likes</p>
              <Progress
                value={
                  user && !user.nbVotesPour && !user.nbVotesContre
                    ? 50
                    : (!user?.nbVotesContre || !user?.nbVotesPour
                        ? 50
                        : user.nbVotesPour /
                          (user.nbVotesPour + user.nbVotesContre)) * 100
                }
                className="w-[30%] bg-destructive"
              />
              <p>
                {user && user.nbVotesContre ? user.nbVotesContre : 0} dislikes
              </p>
            </div>

            <div className="flex flex-row gap-4">
              {user && user.tags ? (
                user.tags.split(",").map((tag: any) => (
                  <Badge
                    className="w-fit flex flex-row"
                    variant={"outline"}
                    key={tag}
                  >
                    {tag}
                  </Badge>
                ))
              ) : (
                <>
                  <Skeleton className="h-5 w-[250px]" />
                </>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-xl w-fit px-4 py-2 m-0 rounded-lg bg-secondary">
                Description
              </h1>
              {user ? (
                <p
                  className="ml-5"
                  dangerouslySetInnerHTML={
                    user.description
                      ? {
                          __html: user.description,
                        }
                      : { __html: "<p>Aucune description</p>" }
                  }
                ></p>
              ) : (
                <Skeleton className="h-20 w-[full]" />
              )}
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-xl w-fit px-4 py-2 m-0 rounded-lg bg-secondary">
                Description
              </h1>
              <div className="flex flex-col gap-2 ml-5">
                <div className="flex gap-5">
                  <div className="flex items-center">
                    <Globe />
                    <Button
                      variant={"link"}
                      disabled={user ? !user.socialWebsite : true}
                      onClick={() =>
                        window.open(user ? (user.socialWebsite as string) : "")
                      }
                    >
                      Site internet
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <Youtube />
                    <Button
                      variant={"link"}
                      disabled={user ? !user.socialYoutube : true}
                      onClick={() =>
                        window.open(user ? (user.socialYoutube as string) : "")
                      }
                    >
                      Youtube
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <Facebook />
                    <Button
                      variant={"link"}
                      disabled={user ? !user.socialFacebook : true}
                      onClick={() =>
                        window.open(user ? (user.socialFacebook as string) : "")
                      }
                    >
                      Facebook
                    </Button>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex items-center">
                    <Twitter />
                    <Button
                      variant={"link"}
                      disabled={user ? !user.socialTwitter : true}
                      onClick={() =>
                        window.open(user ? (user.socialTwitter as string) : "")
                      }
                    >
                      Twitter
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <Linkedin />
                    <Button
                      variant={"link"}
                      disabled={user ? !user.socialLinkedin : true}
                      onClick={() =>
                        window.open(user ? (user.socialLinkedin as string) : "")
                      }
                    >
                      Linkedin
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <Instagram />
                    <Button
                      variant={"link"}
                      disabled={user ? !user.socialInstagram : true}
                      onClick={() =>
                        window.open(
                          user ? (user.socialInstagram as string) : ""
                        )
                      }
                    >
                      Instagram
                    </Button>
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

            {user && user.role !== "DOCTOR" ? (
              <></>
            ) : (
              <>
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

                <div className="flex flex-col gap-4">
                  <h1 className="text-xl w-fit px-4 py-2 m-0 rounded-lg bg-secondary">
                    Diplômes
                  </h1>
                  <ul className="ml-5">
                    {user ? (
                      <>
                        <li>Diploma 1</li>
                        <li>Diploma 2</li>
                        <li>Diploma 3</li>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col gap-4">
                          <Skeleton className="h-5 w-[200px]" />
                          <Skeleton className="h-5 w-[200px]" />
                          <Skeleton className="h-5 w-[200px]" />
                        </div>
                      </>
                    )}
                  </ul>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <Button variant={"destructive"} onClick={() => handleAvatarClick()}>
            Cancel
          </Button>
          <div className="flex flex-col gap-10">
            <div>
              <Button onClick={handleAvatarClick}>Modifier avatar</Button>
              <img
                src={userTemp.avatar ?? ""}
                alt="User Avatar"
                className="w-[120px] h-[120px] object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                value={userTemp.firstName}
                onChange={(e: any) => {
                  setUserTemp({ ...userTemp, firstName: e.target.value });
                  //console.log("usertemp: ", userTemp);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName">Nom</label>
              <input
                type="text"
                value={userTemp ? userTemp.lastName : "Unknown"}
                onChange={(e: any) => {
                  setUserTemp({ ...userTemp, lastName: e.target.value });
                  //console.log("usertemp: ", userTemp);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={userTemp ? userTemp.email : "Unknown"}
                onChange={(e: any) => {
                  setUserTemp({ ...userTemp, email: e.target.value });
                  //console.log("usertemp: ", userTemp);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                placeholder="Séparer les tags par des virgules"
                value={userTemp && userTemp.tags ? userTemp.tags : ""}
                onChange={(e: any) => {
                  setUserTemp({ ...userTemp, tags: e.target.value });
                  //console.log("usertemp: ", userTemp);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description">Description</label>
              <textarea
                value={userTemp ? userTemp.description ?? "" : "Unknown"}
                onChange={(e: any) => {
                  setUserTemp({ ...userTemp, description: e.target.value });
                  //console.log("usertemp: ", userTemp);
                }}
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label htmlFor="socialWebsite">Site internet</label>
              <input
                type="text"
                value={userTemp ? userTemp.socialWebsite ?? "" : "Unknown"}
                onChange={(e: any) => {
                  setUserTemp({ ...userTemp, socialWebsite: e.target.value });
                  //console.log("usertemp: ", userTemp);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="socialYoutube">Youtube</label>
              <input
                type="text"
                value={userTemp ? userTemp.socialYoutube ?? "" : "Unknown"}
                onChange={(e: any) => {
                  setUserTemp({ ...userTemp, socialYoutube: e.target.value });
                  //console.log("usertemp: ", userTemp);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="socialFacebook">Facebook</label>
              <input
                type="text"
                value={userTemp ? userTemp.socialFacebook ?? "" : "Unknown"}
                onChange={(e: any) => {
                  setUserTemp({ ...userTemp, socialFacebook: e.target.value });
                  //console.log("usertemp: ", userTemp);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="socialTwitter">Twitter</label>
              <input
                type="text"
                value={userTemp ? userTemp.socialTwitter ?? "" : "Unknown"}
                onChange={(e: any) => {
                  setUserTemp({ ...userTemp, socialTwitter: e.target.value });
                  //console.log("usertemp: ", userTemp);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="socialLinkedin">Linkedin</label>
              <input
                type="text"
                value={userTemp ? userTemp.socialLinkedin ?? "" : "Unknown"}
                onChange={(e: any) => {
                  setUserTemp({ ...userTemp, socialLinkedin: e.target.value });
                  //console.log("usertemp: ", userTemp);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="socialInstagram">Instagram</label>
              <input
                type="text"
                value={userTemp ? userTemp.socialInstagram ?? "" : "Unknown"}
                onChange={(e: any) => {
                  setUserTemp({ ...userTemp, socialInstagram: e.target.value });
                  //console.log("usertemp: ", userTemp);
                }}
              />
            </div>
          </div>
          <Button onClick={() => handleSave()}>
            Enregistrer les modifications
          </Button>
        </>
      )}
    </>
  );
}
