import { QorusConfigItem, QorusInterfaceGroups, QorusInterfaceTags, QorusProgrammingLanguage } from '../qorus';
import { QorusLibrary } from './library';

export interface QorusQog {
  fsmid: number;
  name: string;
  display_name: string;
  description?: string;
  short_desc: string;
  type: 'none' | 'event' | 'on-demand' | 'scheduled';
  created: string;
  modified: string;
  schedule?: {
    minute: string;
    hour: string;
    day: string;
    month: string;
    wday: string;
  };
  next?: string;
  config: Record<string, QorusConfigItem>;
  lib: QorusLibrary;
  states: Record<string, QorusQogState>;
  groups: QorusInterfaceGroups;
  last_error?: string;
  enabled?: boolean;
  active?: boolean;
  supports_active?: boolean;
  on_demand?: boolean;
  running?: boolean;
  tags?: QorusInterfaceTags;
  last_jobstatus?: string;
}

export interface QorusQogState {
  name: string;
  action: {
    type: string;
    value: any;
  };
  desc: string;
  id: string;
  initial: boolean;
  execution_order: number;
  position: {
    x: number;
    y: number;
  };
  transitions: QorusQogTransition[];
  is_event_trigger?: boolean;
  type?: string;
  condition?: string | unknown;
  language?: QorusProgrammingLanguage;
  'block-config'?: Record<string, any>;
}

export interface QorusQogTransition {
  state: string;
  branch?: 'true' | 'false';
  language: QorusProgrammingLanguage;
  condition: string | { class: string; connector: string };
}
