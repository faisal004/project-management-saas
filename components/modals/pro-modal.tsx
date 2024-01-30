import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const ProModal = () => {
  const proModal = useProModal();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/upgrade", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
       
        },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        console.log("Upgrade successful");
      } else {
        console.error("Upgrade failed");
      }
    } catch (error) {
      console.error("Error upgrading plan:", error);
    } finally {
      setIsLoading(false);
      proModal.onClose()
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src="/hero.svg" alt="Hero" className="object-cover" fill />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            Upgrade to Taskify Pro Today!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of Taskify
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            onClick={onClick}
            className="w-full"
            variant="outline"
            disabled={isLoading}
          >
            {isLoading ? "Upgrading..." : "Upgrade"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
