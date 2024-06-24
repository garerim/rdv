<div className='pl-8 pr-8'>
      <div className='flex justify-end p-4'>
        <div className='w-1/6'></div>
        <h2 className="text-3xl text-center font-extrabold w-full">Rendez-vous</h2>
        <div className='w-1/6 flex justify-end'>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={resetBooking}>Prendre Rendez-vous</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[600px]">
              <DialogHeader>
                <DialogTitle>Prendre rendez-vous</DialogTitle>
                <DialogDescription>
                  {rdvStep === 1 ? "Sélectionnez une date afin de prendre un rendez-vous.":
                  rdvStep === 2 ? "Sélectionnez un médecin et un créneau libre.":
                  "Sélectionnez le type de rendez-vous souhaité, et expliquer la raison de ce rendez-vous."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 justify-center">
                {rdvStep === 1 ? (
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                  
                ) : rdvStep === 2 ? 
                  <>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-60 justify-between"
                        >
                          {value
                            ? fullNameOf(allMedecins!.find((medecin) => medecin.id === value))
                            : "Sélectionner un médecin"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-60 p-0">
                        <Command>
                          <CommandList>
                            <CommandEmpty>Aucun médecin trouvé.</CommandEmpty>
                            <CommandGroup>
                              {allMedecins!.map((medecin) => (
                                <CommandItem
                                  key={medecin.id}
                                  value={medecin.id}
                                  onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue);
                                    setOpen(false);
                                  }}
                                >
                                  {fullNameOf(medecin)}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <Separator className='my-4'></Separator>
                    <div className="overflow-y-scroll max-h-60 w-full">
                      <Table className="w-full mt-2">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Heure</TableHead>
                            <TableHead>Durée</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {allFreeRdvs?.map((rdv) => (
                            <LigneTableauCrenauxHoraires key={rdv} date={rdv} />
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                 : rdvStep === 3 &&
                  <>
                  <div className='flex gap-4 justify-center'><p>{formatDate(selectedRdv)}</p><Separator orientation='vertical'/><p>{formatHour(selectedRdv)}</p><Separator orientation='vertical'/><p>30 min</p></div>
                  <Separator className='my-4'></Separator>
                  <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-[350px] justify-between"
                        >
                          {value
                            ? rdvTypes.find((type) => type.value === value)?.label
                            : "Sélectionner un type de rendez-vous..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[350px] p-0">
                        <Command>
                          <CommandList>
                            <CommandGroup>
                              {rdvTypes.map((type) => (
                                <CommandItem
                                  key={type.value}
                                  value={type.value}
                                  onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                  }}
                                >
                                  {type.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <Separator className='my-4'></Separator>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email">Description</Label>
                      <Textarea placeholder="Pourquoi souhaitez-vous un rendez-vous ?" value={selectedDescription} onChange={(e:any) => {setSelectedDescription(e.target.value)}}/>
                    </div>
                  </>
                }
              </div>
              <DialogFooter>
                <div className='flex w-full'>
                  <div className='w-1/2 flex justify-start'><Button onClick={decrementRdvStep} variant="outline">{rdvStep === 1 ? "Annuler":"Retour"}</Button></div>
                  <div className='w-1/2 flex justify-end'>
                  {rdvStep === 3 ? 
                    <AlertDialog >
                      <AlertDialogTrigger asChild><Button variant="outline">Valider</Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmer la réservation ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            <div>Une fois validée, cette réservation vous sera facturée, voici un récapitulatif :</div>
                            <div className='flex gap-4 justify-center'>
                              <p>{formatDate(selectedRdv)}</p>
                              <Separator orientation='vertical'/>
                              <p>{formatHour(selectedRdv)}</p>
                              <Separator orientation='vertical'/>
                              <p>30 min</p>
                            </div>
                            <Separator/>
                            <div className='flex justify-between p-4'><div>{fullNameById(selectedDoc)}</div><Separator orientation='vertical'/><div>{value}</div></div>
                            <Separator/>
                            <div className='m-4'>{selectedDescription}</div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          {/*<AlertDialogAction onClick={createRdv}>Continue</AlertDialogAction>*/}
                          <CheckoutButton
                            amount={prices[value]}
                            description={selectedDescription}
                            doc={selectedDoc}
                            selectedTime={selectedRdv}
                            type={selectedType}
                          />
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    : rdvStep === 2 ? <Button disabled>Suivant</Button>:<Button onClick={incrementRdvStep} variant="outline">{rdvStep === 1 ? "Suivant" : "Valider"}</Button>}
                    </div>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Statut</TableHead>
            <TableHead className="w-1/12">Date</TableHead>
            <TableHead>Heure</TableHead>
            <TableHead>Durée</TableHead>
            <TableHead>Médecin</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Prix</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/*{rdvs?.map((rdv) => (
            <LigneTableauListRDV key={rdv.id} rdv={rdv} />
          ))}*/}
        </TableBody>
      </Table>
    </div>