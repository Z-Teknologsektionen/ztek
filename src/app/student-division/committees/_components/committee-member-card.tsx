"use client";
import type { FC } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { CommitteeImage } from "~/components/committees/committee-image";
import { TiltAnimationContainer } from "~/components/layout/tilt-animation-container";

type CommitteeMemberCardProps = {
  email: string;
  image: string;
  name: string;
  nickName: string;
  phone: string;
  role: string;
};

export const CommitteeMemberCard: FC<CommitteeMemberCardProps> = ({
  email,
  image,
  name,
  nickName,
  phone,
  role,
}) => {
  return (
    <TiltAnimationContainer>
      <div className="h-full max-w-xs justify-center space-y-4 rounded-lg border-2 px-2 py-4 shadow">
        <CommitteeImage
          alt={`Profilbild på ${nickName ? `"${nickName}"` : name || ""}`}
          filename={image}
        />
        <div className="space-y-1.5">
          <h2 className="text-lg font-medium leading-none">
            {nickName || name}
          </h2>
          <h3 className="text-sm font-normal leading-none">
            {nickName && name ? name : " "}
          </h3>
          <p className="text-sm font-light leading-tight">{role}</p>
          {email && (
            <a
              className="block text-xs font-extralight leading-tight underline decoration-black underline-offset-2"
              href={`mailto:${email}`}
            >
              <AiOutlineMail className="mr-2 inline-block" size={16} />
              {email}
            </a>
          )}
          {phone && (
            <a
              className="block text-xs font-extralight leading-tight underline decoration-black underline-offset-2"
              href={`tel:${phone}`}
            >
              <AiOutlinePhone className="mr-2 inline-block" size={16} />
              {phone}
            </a>
          )}
        </div>
      </div>
    </TiltAnimationContainer>
  );
};
