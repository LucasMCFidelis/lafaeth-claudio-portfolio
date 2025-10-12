interface MountWhatsappUrlProps {
  number: number;
  message?: string;
}

export function mountWhatsappUrl({ number, message }: MountWhatsappUrlProps) {
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/55${number}${encodedMessage}`;
}
