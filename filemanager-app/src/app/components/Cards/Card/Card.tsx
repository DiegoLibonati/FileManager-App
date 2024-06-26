import { CardProps } from "@/app/lib/entities";

export const Card = ({
  className,
  children,
  style,
  onClick,
}: CardProps): JSX.Element => {
  return (
    <div className={className} style={style} onClick={onClick}>
      {children}
    </div>
  );
};
