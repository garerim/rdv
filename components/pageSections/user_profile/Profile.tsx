import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserProfile } from "@prisma/client";
import {
  Download,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  PenLine,
  Save,
  Twitter,
  Undo,
  Undo2,
  Upload,
  Youtube,
} from "lucide-react";
import { useState, useRef, use, useEffect } from "react";
import Image from "next/image";

export default function Profile({ user }: { user: UserProfile | undefined }) {
  const [profilUnderModification, setProfilUnderModification] = useState(false);
  const [userTemp, setUserTemp] = useState<UserProfile>({} as UserProfile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    console.log("Helloworld");
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
    // window.location.reload();
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
      setUserTemp(
        (userTemp: any) => (
          console.log(userTemp), { ...userTemp, avatar: base64 }
        )
      );
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

  useEffect(() => {
    setUserTemp(user as UserProfile);
  }, [user]);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {!profilUnderModification ? (
        <>
          <div className="flex flex-col w-full gap-10 items-center">
            <Label className="w-full text-3xl">Votre profil</Label>
            <Separator className="w-[90%]" />
            <div className="flex flex-col gap-[60px] mb-[120px] w-[80%]">
              <div className="flex flex-col gap-2 items-center justify-center w-full">
                <div className="w-[120px] h-[120px]">
                  {userTemp && userTemp.avatar ? (
                    <>
                      <div className="flex flex-row gap-5 h-fit w-fit items-center">
                        <Image
                          src={userTemp.avatar}
                          alt="User Avatar"
                          className="w-[120px] h-[120px] object-cover rounded-full"
                          width={120}
                          height={120}
                        ></Image>
                        {user?.avatar !== userTemp?.avatar ? (
                          <div className="flex flex-col gap-1 w-fit">
                            <Button
                              className="w-fit"
                              type="submit"
                              onClick={() => {
                                handleSave(), location.reload();
                              }}
                            >
                              <Save />
                            </Button>
                            <Button
                              type="submit"
                              onClick={() => {
                                location.reload();
                              }}
                            >
                              <Undo2 />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1 w-fit">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    className="w-fit"
                                    type="submit"
                                    onClick={() => {
                                      handleAvatarClick();
                                    }}
                                  >
                                    <Upload />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{"Modifier l'avatar"}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div>
                      <Skeleton
                        className="h-[120px] w-[120px] rounded-full flex flex-col justify-center items-center cursor-pointer select-none"
                        onClick={handleAvatarClick}
                      >
                        <div className="flex flex-col justify-center items-center">
                          <p className="text-center">{"Ajoutez une image"}</p>
                          <Download />
                        </div>
                      </Skeleton>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1 items-center">
                  {user ? (
                    <>
                      <Label className="text-3xl font-bold flex">
                        {user ? user.firstName : "Erreur de chargement..."}{" "}
                        {user ? user.lastName : "Erreur de chargement..."}
                      </Label>
                      <Label className="">
                        {user ? user.email : "Erreur de chargement..."}
                      </Label>
                    </>
                  ) : (
                    <>
                      <Skeleton className="h-8 w-[250px] mb-1" />
                      <Skeleton className="h-5 w-[300px] mt-1" />
                    </>
                  )}
                </div>
                <div className="flex gap-1 mt-3 w-full justify-center">
                  <div className="flex flex-col items-center px-4 py-2 bg-secondary rounded-lg cursor-pointer">
                    <Label className="text-lg">Abonnés 1,2k</Label>
                  </div>
                  <div className="flex flex-col items-center px-4 py-2 bg-secondary rounded-lg cursor-pointer">
                    <Label className="text-lg">Abonnements 1,2k</Label>
                  </div>
                </div>
              </div>

              <div>
                <Progress
                  value={
                    user && !user.nbVotesPour && !user.nbVotesContre
                      ? 50
                      : (!user?.nbVotesContre || !user?.nbVotesPour
                          ? 50
                          : user.nbVotesPour /
                            (user.nbVotesPour + user.nbVotesContre)) * 100
                  }
                  className="w-full bg-destructive"
                />
                <div className="w-full flex justify-around mt-3">
                  <Label className="w-fit">
                    {user && user.nbVotesPour ? user.nbVotesPour : 0} likes
                  </Label>
                  <Label className="w-fit">
                    {user && user.nbVotesPour ? user.nbVotesPour : 0} dislikes
                  </Label>
                </div>
              </div>

              <div className="flex w-full flex-col gap-4">
                <div className="flex flex-row items-center gap-3">
                  <Label className="text-3xl w-fit p-0 m-0">Description</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <PenLine className="cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Editez votre description</DialogTitle>
                        <DialogDescription>
                          Ajouter ou modifier votre description et vos tags.
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="h-80">
                        <div className="flex flex-col gap-5 w-full pr-[26px] ml-[4px] my-5 justify-center">
                          <div className="">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              placeholder="Entrez une description ici."
                              className="col-span-3"
                              value={userTemp?.description ?? ""}
                              onChange={(e: any) =>
                                setUserTemp({
                                  ...userTemp,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="tags">Tags</Label>
                            <Input
                              type="text"
                              id="tag"
                              className="col-span-3"
                              value={userTemp?.tags ?? ""}
                              onChange={(e: any) =>
                                setUserTemp({
                                  ...userTemp,
                                  tags: e.target.value,
                                })
                              }
                            />
                            <p className="text-secondary-foreground opacity-50 text-end italic">
                              Séparer les tags avec des virgules.
                            </p>
                          </div>
                        </div>
                      </ScrollArea>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            onClick={() => {
                              handleSave();
                            }}
                          >
                            Enregistrer
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                {user ? (
                  <>
                    <p
                      className="ml-5"
                      dangerouslySetInnerHTML={
                        userTemp?.description
                          ? {
                              __html: userTemp?.description,
                            }
                          : { __html: "<p>Aucune description</p>" }
                      }
                    ></p>
                    <div className="flex w-full flex-row gap-3 ml-5">
                      {userTemp && userTemp.tags ? (
                        userTemp.tags.split(",").map((tag: any) => (
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
                  </>
                ) : (
                  <Skeleton className="h-20 w-[full]" />
                )}
              </div>

              <div className="flex w-full flex-col gap-4">
                <div className="flex flex-row items-center gap-3">
                  <Label className="text-3xl w-fit p-0 m-0">
                    Réseaux sociaux
                  </Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <PenLine className="cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Editez vos médias</DialogTitle>
                        <DialogDescription>
                          Ajouter les liens de vos réseaux sociaux.
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="h-80">
                        <div className="flex flex-col gap-5 w-full pr-[26px] ml-[4px] my-5 justify-center">
                          <div className="">
                            <Label htmlFor="website">Site internet</Label>
                            <Input
                              type="text"
                              id="website"
                              className="col-span-3"
                              value={userTemp?.socialWebsite ?? ""}
                              onChange={(e: any) =>
                                setUserTemp({
                                  ...userTemp,
                                  socialWebsite: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="">
                            <Label htmlFor="youtube" className="">
                              Youtube
                            </Label>
                            <Input
                              type="text"
                              id="youtube"
                              className="col-span-3"
                              value={userTemp?.socialYoutube ?? ""}
                              onChange={(e: any) =>
                                setUserTemp({
                                  ...userTemp,
                                  socialYoutube: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="">
                            <Label htmlFor="facebook" className="">
                              Facebook
                            </Label>
                            <Input
                              type="text"
                              id="facebook"
                              className="col-span-3"
                              value={userTemp?.socialFacebook ?? ""}
                              onChange={(e: any) =>
                                setUserTemp({
                                  ...userTemp,
                                  socialFacebook: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="">
                            <Label htmlFor="twitter" className="">
                              Twitter
                            </Label>
                            <Input
                              type="text"
                              id="twitter"
                              className="col-span-3"
                              value={userTemp?.socialTwitter ?? ""}
                              onChange={(e: any) =>
                                setUserTemp({
                                  ...userTemp,
                                  socialTwitter: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="">
                            <Label htmlFor="linkedin" className="">
                              Linkedin
                            </Label>
                            <Input
                              type="text"
                              id="linkedin"
                              className="col-span-3"
                              value={userTemp?.socialLinkedin ?? ""}
                              onChange={(e: any) =>
                                setUserTemp({
                                  ...userTemp,
                                  socialLinkedin: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="">
                            <Label htmlFor="instagram" className="">
                              Instagram
                            </Label>
                            <Input
                              type="text"
                              id="instagram"
                              className="col-span-3"
                              value={userTemp?.socialInstagram ?? ""}
                              onChange={(e: any) =>
                                setUserTemp({
                                  ...userTemp,
                                  socialInstagram: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="">
                            <Label htmlFor="video" className="">
                              Vidéo de profil
                            </Label>
                            <Input
                              type="text"
                              id="video"
                              className="col-span-3"
                              value={userTemp?.video ?? ""}
                              onChange={(e: any) =>
                                setUserTemp({
                                  ...userTemp,
                                  video: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </ScrollArea>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            onClick={() => {
                              handleSave();
                            }}
                          >
                            Enregistrer
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex flex-col gap-2 ml-5 w-full items-center">
                  <div className="flex gap-5 w-fit">
                    <div className="flex items-center">
                      <Globe />
                      <Button
                        variant={"link"}
                        disabled={userTemp ? !userTemp.socialWebsite : true}
                        onClick={() =>
                          window.open(
                            userTemp ? (userTemp.socialWebsite as string) : ""
                          )
                        }
                      >
                        Site internet
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Youtube />
                      <Button
                        variant={"link"}
                        disabled={userTemp ? !userTemp.socialYoutube : true}
                        onClick={() =>
                          window.open(
                            userTemp ? (userTemp.socialYoutube as string) : ""
                          )
                        }
                      >
                        Youtube
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Facebook />
                      <Button
                        variant={"link"}
                        disabled={userTemp ? !userTemp.socialFacebook : true}
                        onClick={() =>
                          window.open(
                            userTemp ? (userTemp.socialFacebook as string) : ""
                          )
                        }
                      >
                        Facebook
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-5 w-fit">
                    <div className="flex items-center">
                      <Twitter />
                      <Button
                        variant={"link"}
                        disabled={userTemp ? !userTemp.socialTwitter : true}
                        onClick={() =>
                          window.open(
                            userTemp ? (userTemp.socialTwitter as string) : ""
                          )
                        }
                      >
                        Twitter
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Linkedin />
                      <Button
                        variant={"link"}
                        disabled={userTemp ? !userTemp.socialLinkedin : true}
                        onClick={() =>
                          window.open(
                            userTemp ? (userTemp.socialLinkedin as string) : ""
                          )
                        }
                      >
                        Linkedin
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Instagram />
                      <Button
                        variant={"link"}
                        disabled={userTemp ? !userTemp.socialInstagram : true}
                        onClick={() =>
                          window.open(
                            userTemp ? (userTemp.socialInstagram as string) : ""
                          )
                        }
                      >
                        Instagram
                      </Button>
                    </div>
                  </div>
                  {userTemp?.video ? (
                    <div className="flex flex-col gap-2 mt-2">
                      <Label className="text-base">Vidéo de profil</Label>
                      <iframe
                        className="w-[560px] h-[315px]"
                        src={userTemp ? (userTemp.video as string) : ""}
                        title="YouTube video player"
                        allow="accelerometer; gyroscope; picture-in-picture;"
                      ></iframe>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
