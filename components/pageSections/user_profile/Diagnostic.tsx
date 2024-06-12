import { prisma } from "@/lib/prisma";
import { UserProfile } from "@prisma/client";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const VerticalBarMain = () => {
    return <div className="w-1 min-h-full bg-slate-600 mr-4 text-slate-600">.</div>;
};

const VerticalBarSecond = () => {
    return <div className="w-1 min-h-full bg-slate-600 mr-4 ml-8 text-slate-600">.</div>;
};



export default  function Diagnostic({ user }: { user: UserProfile | undefined }) {

    

    return (
        <div>
            <p className="text-3xl text-center font-extrabold">Diagnostiques et traitements</p>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" >
                    <AccordionTrigger className="hover:no-underline">
                        <div className="flex">
                            <VerticalBarMain/>
                            <div>
                                <div className="bg-white ml-1 pl-3">Diagnostique 1</div>
                                <div className="font-light text-xs bg-white ml-1 pl-3 text-left">10/06/2024</div>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex ">
                            <VerticalBarSecond/>
                            <div>
                                <div className="text-lg font-bold">Traitement :</div>
                                <div className="text-sm">Prendre 1 pilule à chaque repas, 15min avant le repas.</div>
                                <br/>
                                <div className="font-light text-sm">Dr. John Doe</div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <div>
                            <div>Diagnostique 1</div>
                            <div className="font-light text-xs">10/06/2024</div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes. It comes with default styles that match the other components' aesthetic.
                    </AccordionContent>
                </AccordionItem>    
                <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it if you
                    prefer.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}