import { ReactNode } from "react";

export declare type HomeCardProps = {
    img:string,
    title: string,
    description: string,
    handleClick: () => void;
    className: string;
}

export declare type MeetingModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children?: ReactNode;
    handleClick?: () => void;
    buttonText?: string;
    image?: string;
    buttonIcon?:string;
  }