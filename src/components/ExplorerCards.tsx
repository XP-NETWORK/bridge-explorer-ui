import { ExplorerCard } from "./ExplorerCard";
import { Container } from "./Container";
import TransactionsIcon from "../assets/icons/transactions.svg";
import UsersIcon from "../assets/icons/users.svg";
import VolumeIcon from "../assets/icons/volume.svg";

export const ExplorerCards = () => {
  return (
    <Container className="flex flex-col md:flex-row gap-4 mt-8">
      <ExplorerCard
        title="14,611"
        subtitle="Transactions"
        icon={TransactionsIcon}
      />
      <ExplorerCard title="5,674" subtitle="Users" icon={UsersIcon} />
      <ExplorerCard
        title="$453.43M"
        subtitle="Volume (USD)"
        icon={VolumeIcon}
      />
    </Container>
  );
};
