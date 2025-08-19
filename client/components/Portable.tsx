// client/components/Portable.tsx
import { PortableText } from "@portabletext/react";

type Props = { value: any };

export default function Portable({ value }: Props) {
  return (
    <div className="prose prose-neutral max-w-none">
      <PortableText value={value} />
    </div>
  );
}