import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type AntecedentType = 'CHIRURGICAL' | 'FAMILIAUX' | 'PSYCHOLOGIQUES' | 'TOXICOLOGIQUES' | 'TRAUMATIQUES' | 'VACCINAUX' | 'ALLERGIQUES' | 'AUTRES';

type TransformToAntecedentDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (type: AntecedentType) => void;
};

const TransformToAntecedentDialog: React.FC<TransformToAntecedentDialogProps> = ({ open, onClose, onConfirm }) => {
  const [selectedType, setSelectedType] = useState<AntecedentType>('AUTRES');

  const handleConfirm = () => {
    onConfirm(selectedType);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"Choisir un type d'antécédent"}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value as AntecedentType)} className="w-full p-2 border rounded">
            <option value="CHIRURGICAL">Chirurgical</option>
            <option value="FAMILIAUX">Familiaux</option>
            <option value="PSYCHOLOGIQUES">Psychologiques</option>
            <option value="TOXICOLOGIQUES">Toxicologiques</option>
            <option value="TRAUMATIQUES">Traumatiques</option>
            <option value="VACCINAUX">Vaccinaux</option>
            <option value="ALLERGIQUES">Allergiques</option>
            <option value="AUTRES">Autres</option>
          </select>
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          {selectedType ? <Button type="submit" variant="outline" onClick={handleConfirm}>Confirmer</Button> : <Button disabled>Confirmer</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransformToAntecedentDialog;
