"use client";

import { Loader } from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { isTokenExpired } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";

export default function Register() {
  const [isMounted, setIsMounted] = useState(false);
  const [jwtToken, setJwtToken] = useState<string | null>();
  const [jwtExp, setJwtExp] = useState<string | null>();

  const [loading, setLoading] = useState(false);
  const [emailSendLoading, setEmailSendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorConfirm, setErrorConfirm] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sexe, setSexe] = useState("H");
  const [birthDate, setBirthDate] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [code, setCode] = useState<string | null>();
  const [emailSended, setEmailSended] = useState(false);
  const [userCode, setUserCode] = useState<string | null>();
  const [timeLeft, setTimeLeft] = useState(180);

  const [isActive, setIsActive] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const createUser = async () => {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        rawPassword: password,
        firstName: firstName,
        lastName: lastName,
        sexe: sexe,
        birthDate: birthDate,
      }),
    });

    if (response.ok) {
      console.log("User created successfully");
    } else {
      const errorData = await response.json();
      setError(
        errorData.error || "Erreur lors de la création de l'utilisateur"
      );
    }

    setLoading(false);
    if (response.ok) {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const setLocalStorage = () => {
      try {
        const storedJwt = localStorage.getItem("jwtToken");
        const storedJwtExp = localStorage.getItem("jwtExp");
        setJwtToken(storedJwt);
        setJwtExp(storedJwtExp);
        setIsMounted(true);
      } catch (error) {
        console.error("Error setting local storage:", error);
      }
    };

    const verifyJWT = async () => {
      // console.log(jwtToken, jwtExp)
      if (
        jwtToken !== null &&
        jwtToken !== undefined &&
        jwtExp !== null &&
        jwtExp !== undefined
      ) {
        const expNumber = parseInt(jwtExp);
        const isExpired = isTokenExpired(expNumber);
        console.log(isExpired);
        if (isExpired) {
          setJwtToken(null);
          setJwtExp(null);
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("jwtExp");
        }
      }
    };

    setLocalStorage();
    verifyJWT();
  }, [jwtExp, jwtToken]);

  const emailCode = async () => {
    let code = await Math.floor(Math.random() * 900000 + 100000);
    console.log(code as unknown as string);
    setCode(code as unknown as string);
  };

  const sendEmail = async () => {
    setEmailSendLoading(true);
    setErrorConfirm(null);

    const response = await fetch("/api/send-email/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        code: code,
      }),
    });

    if (response.ok) {
      console.log("Email sent successfully");
    } else {
      const errorData = await response.json();
      setErrorConfirm(
        errorData.error || "Erreur lors de l'envoi de l'email de confirmation"
      );
    }

    setEmailSendLoading(false);
    setEmailSended(true);
  };

  useEffect(() => {
    if (code) {
      sendEmail();
    }
  }, [code]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer!);
            setIsActive(false);
            setCode(null);
            setTimeLeft(180);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const validatePassword = (password: string): boolean => {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);

    return hasSpecialChar && hasLowercase && hasUppercase;
  };

  const validator = () => {
    if (firstName.length < 3) {
      setError("Le prénom est trop court.")
    } else if (lastName.length < 3) {
      setError("Le nom est trop court.")
    } else if (validatePassword(password)) {
      setError("Le mot de passe peut être trop petit ou peut ne pas contenir les éléments suivants:<br/>au moins 1 caractère special<br/>au moins 1 lettre minuscule<br/>au moins 1 lettre majuscule")
    } else if (!birthDate) {
      setError("La date d'anniversaire n'a pas été saisie.")
    }
  }

  return (
    <>
      {!isMounted ? (
        <Loader />
      ) : jwtToken ? (
        (window.location.href = "/dashboard")
      ) : (
        <div className="relative w-full h-full flex justify-center items-center">
          <Card className="w-1/3 max-w-md">
            <CardHeader>
              <CardTitle>Créer un compte</CardTitle>
              <CardDescription>
                Entrez vos informations pour créer un compte.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                action="#"
                onSubmit={createUser}
                className="w-full h-1/2 flex flex-col items-center gap-4"
              >
                <Input
                  type="text"
                  placeholder="Prénom"
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="off"
                />
                <Input
                  type="text"
                  placeholder="Nom"
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="off"
                />

                <Input
                  type="email"
                  placeholder="email@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                />

                <Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                />

                <Input
                  type="date"
                  onChange={(e) => setBirthDate(e.target.value)}
                  autoComplete="off"
                />

                <select
                  onChange={(e) => {
                    setSexe(e.target.value), console.log(e.target.value);
                  }}
                  autoComplete="off"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                >
                  <option value="" selected disabled>
                    Êtes-vous... ?
                  </option>
                  <option value="H">Homme</option>
                  <option value="F">Femme</option>
                </select>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      className="cursor-pointer"
                    >
                      Suivant
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{"Vérifier l'email"}</DialogTitle>
                      <DialogDescription>
                        Veuillez confirmer votre email pour continuer.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex flex-col gap-4 items-center">
                        <Label htmlFor="email">
                          {!emailSended ? "Email" : "Code"}
                        </Label>
                        {!emailSended ? (
                          <Input
                            id="email"
                            placeholder="Re-tapez l'email"
                            autoComplete="off"
                            onChange={(e: any) =>
                              setConfirmEmail(e.target.value)
                            }
                            disabled={emailSendLoading}
                          />
                        ) : (
                          <>
                            <InputOTP
                              maxLength={6}
                              onChange={(value: string) => (
                                setUserCode(value), console.log(value)
                              )}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                            <Label>
                              Temps restant avant fin de validité du code:{" "}
                              {timeLeft}s
                            </Label>
                          </>
                        )}
                      </div>
                      {errorConfirm ? <Label>{errorConfirm}</Label> : <></>}
                    </div>
                    <DialogFooter>
                      <DialogClose>
                        <Button type="button" variant="destructive">
                          Annuler
                        </Button>
                      </DialogClose>
                      {!emailSended ? (
                        <Button
                          className="w-fit"
                          disabled={emailSendLoading}
                          onClick={() => {
                            email === confirmEmail
                              ? (emailCode(),
                                console.log(code),
                                handleStart(),
                                setErrorConfirm(null))
                              : setErrorConfirm(
                                  "Les emails ne correspondent pas"
                                );
                          }}
                        >
                          {emailSendLoading
                            ? "Envoi en cours..."
                            : "Envoyer le code de confirmation"}
                        </Button>
                      ) : (
                        <Button
                          className="w-fit"
                          onClick={() => {
                            code == userCode
                              ? (setErrorConfirm(null),
                                createUser())
                              : setErrorConfirm("Le code est incorrect");
                          }}
                        >
                          {"Valider l'inscription"}
                        </Button>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {error && <p>{error}</p>}
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
