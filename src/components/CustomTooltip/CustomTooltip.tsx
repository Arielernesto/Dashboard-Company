import { type CustomTooltip } from "./CustomTooltip.types";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'
import { Info } from "lucide-react";

export function CustomTooltip(props: CustomTooltip) {
  const { content } = props
  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <Info strokeWidth={1} className="h-5 w-5"></Info>
            </TooltipTrigger>
            <TooltipContent>
                <p>{content}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}
