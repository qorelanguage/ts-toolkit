export interface QorusSystem {
  readonly uuid?: string;
  readonly telemetry?: boolean;
  readonly 'instance-key'?: string;
  readonly 'session-id'?: number;
  readonly 'omq-version'?: string;
  readonly 'omq-build'?: string;
  readonly 'omq-version-code'?: number;
  readonly 'qore-version'?: string;
  readonly modules?: { [key: string]: QorusModule };
  readonly 'datamodel-version'?: string;
  readonly 'omq-schema'?: string;
  readonly 'omq-driver'?: string;
  readonly 'omq-db-version'?: number;
  readonly 'omquser-schema'?: string;
  readonly 'omquser-driver'?: string;
  readonly 'omquser-db-version'?: number;
  readonly starttime?: Date;
  readonly hostname?: string;
  readonly pid?: number;
  readonly threads?: number;
  readonly 'schema-properties'?: QorusSchemaProperties;
  readonly omq_dir?: string;
  readonly cache_size?: number;
  readonly shutting_down?: boolean;
  readonly 'build-type'?: string;
  readonly 'runtime-properties'?: QorusRuntimeProperties;
  readonly 'alert-summary'?: QorusAlertSummary;
  readonly debug?: boolean;
  readonly 'debug-internals'?: boolean;
  readonly health?: string;
  readonly 'ui-compatibility-version'?: string;
  readonly plugins?: any[];
  readonly edition?: string;
  readonly tz_region?: string;
  readonly tz_utc_offset?: number;
  readonly system_log_url?: string;
  readonly audit_log_url?: string;
  readonly http_log_url?: string;
  readonly mon_log_url?: string;
  readonly alert_log_url?: string;
  readonly api_version?: string;
  readonly cluster_info?: QorusClusterInfo;
  readonly processes?: QorusProcesses;
  readonly workflow_total?: number;
  readonly workflow_alerts?: number;
  readonly service_total?: number;
  readonly service_alerts?: number;
  readonly job_total?: number;
  readonly job_alerts?: number;
  readonly remote_total?: number;
  readonly remote_alerts?: number;
  readonly user_total?: number;
  readonly user_alerts?: number;
  readonly datasource_total?: number;
  readonly datasource_alerts?: number;
  readonly order_stats?: QorusOrderStat[];
  readonly loggerParams?: QorusLoggerParams;
  readonly auth_label_values?: string[];
  readonly grafana_panel_ids?: QorusGrafanaPanelIDS;
  readonly limits?: QorusLimits;
  readonly default_mapper_keys?: { [key: string]: QorusDefaultMapperKey };
  readonly pipeline_options?: QorusPipelineOptions;
  readonly stack_size?: number;
  readonly is_kubernetes?: boolean;
  readonly templates?: QorusTemplate[];
  readonly oauth2_enabled?: boolean;
  readonly supports_ai?: boolean;
  readonly order_count?: number;
  readonly job_exec_count?: number;
  readonly service_call_count?: number;
}

export interface QorusAlertSummary {
  readonly transient?: number;
  readonly ongoing?: number;
}

export interface QorusClusterInfo {
  readonly [key: string]: {
    readonly node_priv?: number;
    readonly node_priv_str?: string;
    readonly node_ram?: number;
    readonly node_ram_str?: string;
    readonly node_ram_in_use?: number;
    readonly node_ram_in_use_str?: string;
    readonly node_cpu_count?: number;
    readonly node_load_pct?: number;
    readonly mem_history?: QorusMemHistory[];
    readonly process_count?: number;
    readonly process_history?: QorusProcessHistory[];
  };
}

export interface QorusMemHistory {
  readonly node_priv?: number;
  readonly node_priv_str?: string;
  readonly node_ram_in_use?: number;
  readonly node_ram_in_use_str?: string;
  readonly node_cpu_count?: number;
  readonly node_load_pct?: number;
  readonly timestamp?: Date;
}

export interface QorusProcessHistory {
  readonly count?: number;
  readonly timestamp?: Date;
}

export interface QorusDefaultMapperKey {
  readonly desc?: string;
  readonly value_type?: string;
  readonly requires_field_type?: boolean;
  readonly unique_roles?: string[];
  readonly requires_roles?: string[];
  readonly returns_type?: string;
}

export interface QorusGrafanaPanelIDS {
  readonly node_process_count?: number;
  readonly node_memory?: number;
  readonly node_cpu_load?: number;
  readonly number_of_services?: number;
  readonly number_of_workflows?: number;
  readonly number_of_jobs?: number;
  readonly workflow_overall_statuses?: number;
  readonly sla_stats?: number;
  readonly workflow_disposition?: number;
  readonly workflow_instances_statuses?: number;
}

export interface QorusLimits {
  readonly nofile?: number;
  readonly nproc?: number;
}

export interface QorusLoggerParams {
  readonly logger_levels?: QorusLoggerLevels;
  readonly appenders_types?: string[];
  readonly appenders_fields?: QorusAppendersFields;
  readonly default_logger_params?: QorusDefaultLoggerParams;
  readonly default_appender_params?: QorusDefaultAppenderParams;
  readonly configurable_systems?: QorusConfigurableSystem[];
}

export interface QorusAppendersFields {
  readonly name?: string[];
  readonly layoutPattern?: string[];
  readonly filename?: string[];
  readonly encoding?: string[];
  readonly rotationCount?: string[];
  readonly archivePattern?: string[];
}

export interface QorusConfigurableSystem {
  readonly name?: string;
  readonly logger?: string;
  readonly uri_path?: string;
  readonly description?: string;
}

export interface QorusDefaultAppenderParams {
  readonly LoggerAppenderStdOut?: QorusLoggerAppender;
  readonly LoggerAppenderFile?: QorusLoggerAppender;
  readonly LoggerAppenderFileRotate?: QorusLoggerAppenderFileRotate;
}

export interface QorusLoggerAppender {
  readonly name?: string;
  readonly layoutPattern?: string;
  readonly filename?: QorusFilename;
  readonly encoding?: string;
}

export interface QorusFilename {
  readonly workflow?: string;
  readonly service?: string;
  readonly job?: string;
  readonly system?: string;
}

export interface QorusLoggerAppenderFileRotate {
  readonly name?: string;
  readonly layoutPattern?: string;
  readonly filename?: QorusFilename;
  readonly encoding?: string;
  readonly rotationCount?: number;
  readonly archivePattern?: string;
}

export interface QorusDefaultLoggerParams {
  readonly name?: string;
}

export interface QorusLoggerLevels {
  readonly OFF?: number;
  readonly FATAL?: number;
  readonly ERROR?: number;
  readonly WARN?: number;
  readonly INFO?: number;
  readonly DEBUG?: number;
  readonly TRACE?: number;
  readonly ALL?: number;
}

export interface QorusModule {
  readonly filename?: string;
  readonly name?: string;
  readonly desc?: string;
  readonly version?: string;
  readonly author?: string;
  readonly url?: string;
  readonly license?: QorusLicense;
  readonly 'reexported-modules'?: string[];
  readonly injected?: boolean;
  readonly reinjected?: boolean;
  readonly user?: boolean;
  readonly api_major?: number;
  readonly api_minor?: number;
  readonly info?: QorusInfo;
}

export interface QorusInfo {
  readonly python_version?: string;
  readonly python_major?: number;
  readonly python_minor?: number;
  readonly python_micro?: number;
}

export type QorusLicense = 'MIT' | 'Proprietary' | 'unknown' | 'LGPL';

export interface QorusOrderStat {
  readonly label?: string;
  readonly range_start?: Date;
  readonly l?: QorusL[];
  readonly sla?: QorusSla[];
}

export interface QorusL {
  readonly disposition?: string;
  readonly count?: number;
  readonly pct?: number;
}

export interface QorusSla {
  readonly in_sla?: boolean;
  readonly count?: number;
  readonly pct?: number;
}

export interface QorusPipelineOptions {
  readonly input_provider_search?: QorusPipelineOptionsInput;
  readonly input_search_options?: QorusPipelineOptionsInput;
  readonly input_request?: QorusPipelineOptionsInput;
  readonly input_request_options?: QorusPipelineOptionsInput;
  readonly input_provider_bulk?: QorusPipelineOptionsInput;
}

export interface QorusPipelineOptionsInput {
  readonly type?: string;
  readonly desc?: string;
}

export interface QorusProcesses {
  readonly 'qorus-master-rippy'?: QdspOmq;
  readonly 'qorus-core'?: QdspOmq;
  readonly 'qdsp-omq'?: QdspOmq;
  readonly 'qdsp-omquser'?: QdspOmq;
}

export interface QdspOmq {
  readonly restarted?: boolean;
  readonly id?: string;
  readonly node?: string;
  readonly instance_id?: string;
  readonly status?: number;
  readonly status_string?: string;
  readonly urls?: string[];
  readonly host?: string;
  readonly pid?: number;
  readonly type?: string;
  readonly client_id?: string;
  readonly started?: Date;
  readonly vsz?: number;
  readonly rss?: number;
  readonly priv?: number;
  readonly priv_str?: string;
  readonly connstr?: string;
}

export interface QorusRuntimeProperties {
  readonly QoreDebug?: string;
}

export interface QorusSchemaProperties {
  readonly 'schema-compatibility'?: string;
  readonly 'schema-load-compatibility'?: string;
  readonly 'schema-version'?: string;
  readonly 'system-uuid'?: string;
}

export interface QorusTemplate {
  readonly name?: string;
  readonly desc?: string;
  readonly doc_url?: string;
  readonly valid_context?: number;
  readonly access?: number;
}
