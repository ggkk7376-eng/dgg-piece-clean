import { Text } from "@/components/text";

type TwoColumn = {
    leftColumn?: string | null;
    rightColumn?: string | null;
    id?: string | null;
    blockType?: "two-columns";
};

type Props = TwoColumn & {
    className?: string;
};

export const TwoColumns = ({ leftColumn, rightColumn }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 my-8">
            <div className="flex flex-col gap-4">
                {leftColumn && (
                    <Text variant="p2" className="text-muted-foreground whitespace-pre-wrap">
                        {leftColumn}
                    </Text>
                )}
            </div>
            <div className="flex flex-col gap-4">
                {rightColumn && (
                    <Text variant="p2" className="text-muted-foreground whitespace-pre-wrap">
                        {rightColumn}
                    </Text>
                )}
            </div>
        </div>
    );
};
