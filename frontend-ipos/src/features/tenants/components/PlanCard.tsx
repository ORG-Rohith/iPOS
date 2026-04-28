import { Card } from "../../../shared/components/ui/card";

interface PlanCardProps {
    name: string;
    price: string;
    features: string[];
    selected: boolean;
    onClick: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
    name,
    price,
    features,
    selected,
    onClick,
}) => {
    return (
        <Card
            onClick={onClick}
            className={`border rounded-xl p-5 cursor-pointer transition-all ${selected
                ? "border-primary bg-primary-light"
                : "border-gray-200 hover:border-primary"
                }`}
        >
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-primary font-bold mt-1">{price}</p>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {features.map((f, i) => (
                    <li key={i}>✔ {f}</li>
                ))}
            </ul>
        </Card>
    );
};

export default PlanCard;