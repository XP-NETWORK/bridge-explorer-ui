import { ExplorerCard } from "./ExplorerCard";
import { Container } from "./Container";
import TransactionsIcon from "../assets/icons/transactions.svg";
import UsersIcon from "../assets/icons/users.svg";
import VolumeIcon from "../assets/icons/volume.svg";
import { withContainer } from "../context/ServcieProvder";

export const ExplorerCards = withContainer(
  ({
    container: {
      appData: { totalTx, totalWallets },
    },
  }) => {
    return (
      <Container className="flex flex-col md:flex-row gap-4 mt-8">
        <ExplorerCard
          title={totalTx}
          subtitle="Transactions"
          icon={TransactionsIcon}
        />
        <ExplorerCard title={totalWallets} subtitle="Users" icon={UsersIcon} />
        <ExplorerCard
          title="$453.43M"
          subtitle="Volume (USD)"
          icon={VolumeIcon}
        />
      </Container>
    );
  }
);
