import { QorusAlert } from './alerts';
import { QorusLibrary } from './library';

export interface QorusService {
  type: 'user' | 'system'; // the type of the service
  name: string; // the service name
  version: string; // the service version
  patch?: string; // the service patch string (if any)
  display_name?: string; // the display name
  short_desc?: string; // the short description in plain text
  desc?: string; // the service description
  author?: string; // the author of the service (if any)
  serviceid: number; // the service ID
  remote: boolean; // if the service is remote or not
  stateless: boolean; // True if the service is stateless
  parse_options?: any[]; // a list of symbolic parse options for the service program container (if any)
  status: string; // the status of the service; one of: "loaded", "running", "unloaded"
  processes?: QorusProcessInfo[]; // a list of service processes running for this service
  config?: Record<string, ConfigItemInfo>; // a hash of configuration item info keyed by config item name
  global_config?: Record<string, GlobalConfigItemInfo>; // a hash of global configuration item info keyed by config item name
  log?: string; // the complete path to the service log file
  threads?: number; // the number of active threads in the service
  autostart: boolean; // boolean value indicating if the service should be autostarted or not
  manual_autostart: boolean; // boolean flag set if the autostart value has been changed manually
  loaded?: string; // date/time the service was loaded
  methods: MethodInfo[]; // a list of hashes for each service method
  resources?: Record<string, ServiceResourceDetailInfo>; // a hash of service resources (if any), keys are resource names
  resource_files?: ServiceFileResourceInfo[]; // a list of hashes giving service resource file information (if any)
  options?: OptionValueInfo[]; // a hash of options set on the service
  service_modules?: string[]; // a list of associated modules
  groups?: GroupInfo[]; // a list of interface groups that the service belongs to
  alerts?: QorusAlert[]; // a list of alerts raised against the workflow
  waiting_threads?: number; // how many threads are currently waiting on the service (running services only)
  active_calls?: number; // currently active calls on the service (running services only)
  lib?: QorusLibrary; // information about any referenced Qorus objects
  log_url?: string; // the log URL (if any)
  enabled: boolean; // a boolean flag indicating if the service is enabled or not
  connections?: InterfaceConnectionInfo[]; // a list of connection objects that this service depends on
  tags?: Record<string, any>; // any tags for the service
}

interface QorusProcessInfo {
  // Define fields for QorusProcessInfo here
}

interface ConfigItemInfo {
  // Define fields for ConfigItemInfo here
}

interface GlobalConfigItemInfo {
  // Define fields for GlobalConfigItemInfo here
}

interface MethodInfo {
  name: string;
  desc?: string;
}

interface ServiceResourceDetailInfo {
  type: string;
  desc?: string;
  info?: Record<string, any>;
}

interface ServiceFileResourceInfo {
  type: string;
  name: string;
}

interface OptionValueInfo {
  name: string;
  desc?: string;
  value: any;
}

interface GroupInfo {
  // Define fields for GroupInfo here
}

interface InterfaceConnectionInfo {
  // Define fields for InterfaceConnectionInfo here
}
