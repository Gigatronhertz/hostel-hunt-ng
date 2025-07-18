import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Smile, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "2348012345678"; // Replace with your payments WhatsApp number
const PAYMENT_MESSAGE = encodeURIComponent(
  "Hi! I'm ready to complete my payment as an agent on Hostel.ng. Please assist me with the next steps."
);

export default function AgentPayment() {
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${PAYMENT_MESSAGE}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-100">
      <Card className="max-w-md w-full shadow-xl border-0">
        <CardHeader className="flex flex-col items-center gap-2">
          <Smile className="w-12 h-12 text-green-500" />
          <CardTitle className="text-2xl font-bold text-center">Welcome Agent!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-center text-lg text-muted-foreground">
            Thank you for choosing Hostel.ng. To unlock all features and start listing your properties, please complete your agent payment.
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 flex gap-2 items-center text-lg shadow-md"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="w-5 h-5" />
              Complete Payment on WhatsApp
            </Button>
          </div>
          <p className="mt-8 text-center text-sm text-green-700 font-medium">
            Our team is here to help you every step of the way!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
