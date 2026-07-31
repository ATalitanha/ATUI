import React, { forwardRef } from "react";
import * as Lucide from "lucide-react";

export interface AuroraIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

// Reusable generic icon wrapper to keep Lucide isolated and allow swapping
function createAuroraIcon(LucideComponent: React.ComponentType<any>) {
  const Component = forwardRef<SVGSVGElement, AuroraIconProps>(
    ({ size = 18, strokeWidth = 1.5, ...props }, ref) => {
      return React.createElement(LucideComponent, {
        ref,
        size,
        strokeWidth,
        ...props,
      });
    }
  );
  Component.displayName = LucideComponent.displayName || "AuroraIcon";
  return Component;
}

// Curated suite of high-fidelity, architectural icons for Aurora UI components
export const HomeIcon = createAuroraIcon(Lucide.Home);
export const SettingsIcon = createAuroraIcon(Lucide.Settings);
export const UserIcon = createAuroraIcon(Lucide.User);
export const ChevronDownIcon = createAuroraIcon(Lucide.ChevronDown);
export const ChevronUpIcon = createAuroraIcon(Lucide.ChevronUp);
export const ChevronLeftIcon = createAuroraIcon(Lucide.ChevronLeft);
export const ChevronRightIcon = createAuroraIcon(Lucide.ChevronRight);
export const CalendarIcon = createAuroraIcon(Lucide.Calendar);
export const TerminalIcon = createAuroraIcon(Lucide.Terminal);
export const CheckIcon = createAuroraIcon(Lucide.Check);
export const CloseIcon = createAuroraIcon(Lucide.X);
export const SearchIcon = createAuroraIcon(Lucide.Search);
export const PlusIcon = createAuroraIcon(Lucide.Plus);
export const MinusIcon = createAuroraIcon(Lucide.Minus);
export const ArrowRightIcon = createAuroraIcon(Lucide.ArrowRight);
export const ArrowLeftIcon = createAuroraIcon(Lucide.ArrowLeft);
export const FileIcon = createAuroraIcon(Lucide.File);
export const FolderIcon = createAuroraIcon(Lucide.Folder);
export const ActivityIcon = createAuroraIcon(Lucide.Activity);
export const MenuIcon = createAuroraIcon(Lucide.Menu);
export const CartIcon = createAuroraIcon(Lucide.ShoppingCart);
export const InfoIcon = createAuroraIcon(Lucide.Info);
export const AlertCircleIcon = createAuroraIcon(Lucide.AlertCircle);
export const HelpCircleIcon = createAuroraIcon(Lucide.HelpCircle);
export const LoaderIcon = createAuroraIcon(Lucide.Loader2);
export const PlayIcon = createAuroraIcon(Lucide.Play);
export const PauseIcon = createAuroraIcon(Lucide.Pause);
export const VolumeIcon = createAuroraIcon(Lucide.Volume2);
export const TrashIcon = createAuroraIcon(Lucide.Trash2);
export const EditIcon = createAuroraIcon(Lucide.Edit2);
export const LayoutIcon = createAuroraIcon(Lucide.Layout);
export const StarIcon = createAuroraIcon(Lucide.Star);
export const BoldIcon = createAuroraIcon(Lucide.Bold);
export const ItalicIcon = createAuroraIcon(Lucide.Italic);
export const UnderlineIcon = createAuroraIcon(Lucide.Underline);
export const CodeIcon = createAuroraIcon(Lucide.Code);
export const ListIcon = createAuroraIcon(Lucide.List);
export const ListOrderedIcon = createAuroraIcon(Lucide.ListOrdered);
export const GripIcon = createAuroraIcon(Lucide.GripVertical);
export const CopyIcon = createAuroraIcon(Lucide.Copy);