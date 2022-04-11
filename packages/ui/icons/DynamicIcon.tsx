import { LoadableComponent } from "@loadable/component";
import { SquareIcon as FallbackIcon } from "./SquareIcon";

import { IconProps } from "./_props";
import {
  EnvelopeIcon,
  GitHubIcon,
  LaptopIcon,
  LinkedInIcon,
  MoonIcon,
  SquareIcon,
  SunIcon,
  BoltIcon,
  BulbIcon,
  WorldIcon,
  ChevronRightIcon,
  MenuIcon,
  XIcon,
  DownloadIcon,
  MapIcon,
  WorkIcon,
  AwardIcon,
  ExperimentIcon,
  CopyIcon,
  MailSendIcon,
  // import - hygen injection point - do not remove comment
} from "./_loadable";

const LoadableIcons: Record<string, LoadableComponent<IconProps> | undefined> = {
  Envelope: EnvelopeIcon,
  GitHub: GitHubIcon,
  Laptop: LaptopIcon,
  LinkedIn: LinkedInIcon,
  Moon: MoonIcon,
  Square: SquareIcon,
  Sun: SunIcon,
  Bolt: BoltIcon,
  Bulb: BulbIcon,
  World: WorldIcon,
  ChevronRight: ChevronRightIcon,
  Menu: MenuIcon,
  X: XIcon,
  Download: DownloadIcon,
  Map: MapIcon,
  Work: WorkIcon,
  Award: AwardIcon,
  Experiment: ExperimentIcon,
  Copy: CopyIcon,
  MailSend: MailSendIcon,
  // mapping - hygen injection point - do not remove comment
};

export interface IconComponentProps extends IconProps {
  icon: string;
}

export function DynamicIcon(props: IconComponentProps) {
  const { icon, ...iconProps } = props;
  const IconComponent: any = LoadableIcons[icon] ?? FallbackIcon; // FIXME: type error
  return <IconComponent {...iconProps} />;
}
