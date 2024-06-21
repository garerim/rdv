import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import Devis from './devis';
import RendezVous, {EtatRendezVous, TypeRendezVous} from './rendezvous';
import { useState, useEffect } from 'react';
import { useGlobale } from '../provider/globale-provider';
import { isTokenExpired } from "@/lib/utils";
import NotConnected from "@/components/notConnected/NotConnected";
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutButton = ({ amount = 1 }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const [isMounted, setIsMounted] = useState(false);
  const [jwtToken, setJwtToken] = useState<string | null>();
  const [jwtExp, setJwtExp] = useState<string | null>();

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
      if (
        jwtToken !== null &&
        jwtToken !== undefined &&
        jwtExp !== null &&
        jwtExp !== undefined
      ) {
        const expNumber = parseInt(jwtExp);
        const isExpired = isTokenExpired(expNumber);
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/userByJWT", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tokenBody: localStorage.getItem("jwtToken") }),
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (jwtToken) {
      fetchUser();
    }
  }, [jwtToken]);

  const handleCheckout = async () => {
    const randomId = uuidv4();
    try {
      const stripe = await asyncStripe;
  
      const devis = new Devis({
        id: randomId,
        professionelId: user?.id,
        patientId: user?.id,
        rendezVousId: randomId,
        prixAvantTVA: 100,
        TVA: 0.2,
        prixFinal: 120,
        contenu: 'some-content',
        description: 'some-description',
      });

      const rendezVous = new RendezVous({
        id: randomId,
        professionelId: user?.id,
        patientId: user?.id,
        startDate: new Date(),
        duration: 30,
        etat: EtatRendezVous.A_VENIR,
        typeRendezVous: TypeRendezVous.CONSULTATION,
        description: 'some-description',
        prix: 120,
        fichierJoint : "some-file",
      });

      console.log(rendezVous.toJSON());
      console.log(devis.toJSON());

      if (!devis.validate()) {
        console.error('Invalid devis object:', devis);
        return;
      }

      if (!rendezVous.validate()) {
        console.error('Invalid rendez-vous object:', rendezVous);
        return;
      }

      const metadata = {
        ...devis.toJSON(),
        ...rendezVous.toJSON(),
      };
      console.log(metadata);

      const res = await fetch('/api/stripe/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          metadata,
        }),
      });

      const { sessionId } = await res.json();

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Error redirecting to checkout:', error);
          router.push('/checkout/error');
        }
      } else {
        console.error('Error loading Stripe');
        router.push('/checkout/error');
      }
    } catch (error) {
      console.error('Error handling checkout:', error);
      router.push('/checkout/error');
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-700 hover:bg-blue-800 duration-200 px-8 py-4 text-white"
    >
      Payer par carte bancaire
    </button>
  );
};

export default CheckoutButton;