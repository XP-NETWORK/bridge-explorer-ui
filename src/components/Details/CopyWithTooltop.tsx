import CopyIcon from "../../assets/icons/copy.svg";
import { IEvent } from "../ExplorerEvents";

const CopyWithTooltip = ({
  copyValue,
  copyIdx,
  copyProps: { tooltipCopy, tooltips, setTooltipCopy },
}: {
  copyValue: string | undefined;
  copyProps: { tooltipCopy: number; tooltips: any; setTooltipCopy: Function };
  copyIdx: number;
}) => {
  return (
    <button
      className="copy-btn"
      data-clipboard-text={copyValue}
      data-offset={window.innerWidth < 435 ? "{'left': 50}" : ""}
      data-tip={tooltipCopy ? `Сopied to clipboard` : "Copy"}
      ref={(node) => (tooltips.current[copyIdx] = node)}
      onClick={() => {
        setTooltipCopy(copyIdx);
      }}
    >
      <img className="ml-2" src={CopyIcon} alt="copy button" width={12} />
    </button>
  );
};

export default CopyWithTooltip;
