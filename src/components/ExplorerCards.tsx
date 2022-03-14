import { ExplorerCard } from "./ExplorerCard";
import { Container } from "./Container";
import TransactionsIcon from "../assets/icons/transactions.svg";
import UsersIcon from "../assets/icons/users.svg";
import ChainsIcon from "../assets/icons/chains.svg";
import { withContainer } from "../context/ServcieProvder";

export const ExplorerCards = withContainer(
  ({
    container: {
      appData: { totalTx, totalWallets },
    },
  }) => {
    return (
      <Container className="flex flex-col md:flex-row gap-4 mt-8 cardsWrapper">
        <ExplorerCard
          title={totalTx}
          subtitle="Transactions"
          icon={TransactionsIcon}
        />
        <ExplorerCard title={totalWallets} subtitle="Users" icon={UsersIcon} />
        <ExplorerCard title="10" subtitle="Chains" icon={ChainsIcon} />
      </Container>
    );
  }
);
