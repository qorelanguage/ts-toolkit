interface IQorusWorkflow {
  /** The workflow ID */
  workflowId: number;
  /** The workflow name */
  name: string;
  /** The workflow version */
  version: string;
  /** The display name */
  displayName?: string;
  /** The short description in plain text */
  shortDesc?: string;
  /** The workflow description in markdown */
  description?: string;
  /** The workflow author */
  author?: string;
  /** If true, the workflow will run as a remote qwf process */
  remote: boolean;
  /** Set if the manual value has been changed manually */
  manualRemote: boolean;
  /** The onetimeinit function ID for the workflow (if defined) */
  onetimeInitFuncInstanceId?: number;
  /** The attach function ID for the workflow (if defined) */
  attachFuncInstanceId?: number;
  /** The detach function ID for the workflow (if defined) */
  detachFuncInstanceId?: number;
  /** The error function ID for the workflow (if defined) */
  errorFunctionInstanceId?: number;
  /** The error handler function ID for the workflow (if defined) */
  errHandlerFuncInstanceId?: number;
  /** True if the workflow has detach logic */
  hasDetach: boolean;
  /** The workflow creation date */
  created: Date;
  /** The workflow last modified date */
  modified: Date;
  /** The workflow autostart value */
  autoStart: number;
  /** Set if the autostart value has been changed manually */
  manualAutoStart: boolean;
  /** The workflow SLA threshold value */
  slaThreshold: number;
  /** Set if the slaThreshold value has been changed manually */
  manualSlaThreshold: boolean;
  /** Indicates if the workflow is enabled or not */
  enabled: boolean;
  /** Indicates if the workflow is deprecated or not */
  deprecated: boolean;
  /** If the workflow cannot be edited in the built-in IDE, this is true */
  ideIncompatible?: boolean;
  /** The programming language for the workflow's class (if any) */
  language?: string;
  /** The source code for the workflow's class (if any) */
  code?: string;
  /** The source for the workflow definition */
  source?: string;
  /** The line number offset in source for the workflow definition */
  line?: number;
  /** Any tags for the workflow */
  tags?: Record<string, unknown>;
  /** Set of order keys in hash form */
  orderKeyMap?: Set<unknown>;
  /** Boolean value */
  key: boolean;
  /** A list of workflow order keys */
  keyList?: string[];
  /** A hash where keys are step IDs and values are step names */
  stepMap: Record<string, string>;
  /** A hash of step dependencies */
  steps: Record<string, number[]>;
  /** A list of segment description hashes */
  segment: SegmentInfo[];
  /** Maps step IDs to segment numbers */
  stepSeg?: Record<number, number>;
  /** Information about any referenced Qorus objects */
  lib?: LibraryInfo;
  /** A list of function objects (can be empty) */
  functions?: LibraryDetailInfo[];
  /** A list of class objects (can be empty) */
  classes?: LibraryDetailInfo[];
  /** A list of constant objects (can be empty) */
  constants?: LibraryDetailInfo[];
  /** A list of pipeline objects (can be empty) */
  pipelines?: NameIdInfo[];
  /** A list of FSM objects (can be empty) */
  fsm?: NameIdInfo[];
  /** A list of mappers associated with the workflow */
  mappers?: MapperInfo[];
  /** A list of value maps associated with the workflow */
  vmaps?: VMapInfo[];
  /** A list of hashes giving information about workflow steps */
  stepInfo: WorkflowStepInfo[];
  /** A list of workflow-level functions (may be empty) */
  wfFuncs: WorkflowFuncInfo[];
  /** A list option information hashes */
  options: OptionInfoHash[];
  /** A hash of configuration item info keyed by config item name */
  config?: ConfigItemSummarySetInfo;
  /** A hash of global configuration item info */
  globalConfig?: GlobalConfigItemSetInfo;
  /** A list of workflow execution instances running for this workflow */
  exec?: ExecInstanceInfoV3[];
  /** A list of workflow order processing statistics */
  orderStats?: OrderSummaryOutputInfo[];
  /** Any modules associated with the workflow */
  workflowModules?: string[];
  /** A list of alerts raised against the workflow */
  alerts?: AlertInfo[];
  /** A list of connection objects that this workflow depends on */
  connections?: InterfaceConnectionInfo[];
  /** A list of interface groups that the workflow belongs to */
  groups?: GroupInfo[];
  /** Present when remote is true */
  process?: WorkflowProcessExecInfo;
  /** The number of elements in the exec list */
  execCount: number;
  /** Number of workflow orders with status COMPLETE */
  COMPLETE?: number;
  /** Number of workflow orders with status INCOMPLETE */
  INCOMPLETE?: number;
  /** Number of workflow orders with status WAITING */
  WAITING?: number;
  /** Number of workflow orders with status EVENT-WAITING */
  EVENT_WAITING?: number;
  /** Number of workflow orders with status ASYNC-WAITING */
  ASYNC_WAITING?: number;
  /** Number of workflow orders with status RETRY */
  RETRY?: number;
  /** Number of workflow orders with status ERROR */
  ERROR?: number;
  /** Number of workflow orders with status CANCELED */
  CANCELED?: number;
  /** Number of workflow orders with status BLOCKED */
  BLOCKED?: number;
  /** Number of workflow orders with status IN-PROGRESS */
  IN_PROGRESS?: number;
  /** Number of workflow orders with status SCHEDULED */
  SCHEDULED?: number;
  /** Number of workflow orders with status READY */
  READY?: number;
  /** Number of workflow orders in all statuses */
  TOTAL?: number;
}

interface SegmentInfo {
  key: number;
}

interface LibraryInfo {}
interface LibraryDetailInfo {}
interface NameIdInfo {}
interface MapperInfo {}
interface VMapInfo {}
interface WorkflowStepInfo {}
interface WorkflowFuncInfo {}
interface OptionInfoHash {}
interface ConfigItemSummarySetInfo {
  /** The name of the configuration item */
  name: string;

  /** The prefix of the configuration item (optional) */
  prefix?: string;

  /** The data type of the configuration item */
  type: string;

  /** The description of the configuration item */
  desc: string;

  /** The default value of the configuration item */
  default_value: any;

  /** The value of the configuration item */
  value: any;

  /** If the configuration item is defined strictly on local level */
  strictly_local: boolean;

  /** True if the value is set, otherwise False */
  is_set: boolean;

  /** True if the value is a templated string that can be later expanded */
  is_templated_string: boolean;

  /** The group of the configuration item */
  config_group: string;

  /** The list of allowed values for the configuration item if defined (optional) */
  allowed_values?: any[];

  /** The level from where the value is obtained (e.g., "job:1", "job:2") */
  level: string;
}
interface GlobalConfigItemSetInfo {
  /** The list of allowed values for the configuration item if defined (optional) */
  allowed_values?: any[];

  /** True if the value is set, otherwise False */
  is_set: boolean;

  /** True if the value is a templated string that can be later expanded */
  is_templated_string: boolean;

  /** The prefix of the configuration item (optional) */
  prefix?: string;

  /** The data type of the configuration item */
  type: string;

  /** The value of the configuration item */
  value: any;
}
interface ExecInstanceInfoV3 {}
interface OrderSummaryOutputInfo {}
interface AlertInfo {}
interface InterfaceConnectionInfo {}
interface GroupInfo {}
interface WorkflowProcessExecInfo {
  id: string;
  node: string;
  host: string;
  pid: number;
  logPipe?: string;
  port?: number;
  prometheusPort?: number;
  urls: string[];
  status?: number;
  statusString?: string;
  restarted?: boolean;
  priv?: number;
  rss?: number;
  vsz?: number;
  privStr?: string;
  pct?: number;
  socketPath?: string;
  wfname?: string;
  wfversion?: string;
  wfid?: number;
  sessionid?: number;
}
