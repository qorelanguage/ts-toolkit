export type QorusAlertType = 'ONGOING' | 'TRANSIENT';
export interface QorusAlert {
  alert: string;
  alertid: number;
  alerttype: QorusAlertType;
  auditid?: number;
  config?: Record<string, any>;
  conntype?: string;
  connectionid?: number;
  description?: string;
  first_raised?: string;
  id: string | number;
  instance: string;
  local: boolean;
  name: string;
  object: string;
  reason: string;
  servicetype?: string;
  source: string;
  stateless?: boolean;
  type: string;
  url?: string;
  version?: string;
  when: string;
  who: string;
}
