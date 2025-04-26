import { defineStore } from 'pinia';

export type SolanaNetwork = 'mainnet-beta' | 'testnet' | 'devnet' | 'custom';

export interface NetworkInfo {
  name: string;
  entrypoints: string[];
  genesisHash: string;
  knownValidators: string[];
}

export interface ConfigOption {
  id: string;
  name: string;
  description: string;
  type: 'toggle' | 'text' | 'select' | 'number';
  value: string | boolean | number | null;
  required: boolean;
  warning?: string;
  options?: { value: string; label: string }[];
  category: 'basic' | 'performance' | 'security' | 'network' | 'advanced';
}

export interface NodeConfig {
  type: 'validator' | 'rpc';
  network: SolanaNetwork;
  options: Record<string, ConfigOption>;
}

export interface Preset {
  name: string;
  description: string;
  config: NodeConfig;
}

// Define networks and their entrypoints
export const SOLANA_NETWORKS: Record<SolanaNetwork, NetworkInfo> = {
  'mainnet-beta': {
    name: 'Mainnet Beta',
    entrypoints: [
      'mainnet-beta.solana.com:8001',
      'entrypoint.mainnet-beta.solana.com:8001',
      'entrypoint2.mainnet-beta.solana.com:8001',
      'entrypoint3.mainnet-beta.solana.com:8001',
      'entrypoint4.mainnet-beta.solana.com:8001',
      'entrypoint5.mainnet-beta.solana.com:8001'
    ],
    genesisHash: '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d',
    knownValidators: [
      '7Np41oeYqPefeNQEHSv1UDhYrehxin3NStELsSKCT4K2',
      'GdnSyH3YtwcxFvQrVVJMm1JhTS4QVX7MFsX56uJLUfiZ',
      'DE1bawNcRJB9rVm3buyMVfr8mBEoyyu73NBovf2oXJsJ',
      'CakcnaRDHka2gXyfbEd2d3xsvkJkqsLw2akB3zsN1D2S',
      'Ninja1spj6n9t5hVYgF3PdnYz2PLnkt7rvaw3firmjs',
      'Certusm1sa411sMpV9FPqU5dXAYhmmhygvxJ23S6hJ24'
    ]
  },
  'testnet': {
    name: 'Testnet',
    entrypoints: [
      'entrypoint.testnet.solana.com:8001',
      'entrypoint2.testnet.solana.com:8001',
      'entrypoint3.testnet.solana.com:8001'
    ],
    genesisHash: '4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY',
    knownValidators: [
      '5D1fNXzvv5NjV1ysLjirC4WY92RNsVH18vjmcszZd8on',
      'dDzy5SR3AXdYWVqbDEkVFdvSPCtS9ihF5kJkHCtXoFs',
      'Ft5fbkqNa76vnsjYNwjDZUXoTWpP7VYm3mtsaQckQADN',
      'eoKpUABi59aT4rR9HGS3LcMecfut9x7zJyodWWP43YQ',
      '9QxCLckBiJc783jnMvXZubK4wH86Eqqvashtrwvcsgkv'
    ]
  },
  'devnet': {
    name: 'Devnet',
    entrypoints: [
      'entrypoint.devnet.solana.com:8001',
      'entrypoint2.devnet.solana.com:8001',
      'entrypoint3.devnet.solana.com:8001',
      'entrypoint4.devnet.solana.com:8001',
      'entrypoint5.devnet.solana.com:8001'
    ],
    genesisHash: 'EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG',
    knownValidators: [
      'dv1ZAGvdsz5hHLwWXsVnM94hWf1pjbKVau1QVkaMJ92',
      'dv2eQHeP4RFrJZ6UeiZWoc3XTtmtZCUKxxCApCDcRNV',
      'dv4ACNkpYPcE3aKmYDqZm9G5EB3J4MRoeE7WNDRBVJB',
      'dv3qDFk1DTF36Z62bNvrCXe9sKATA6xvVy6A798xxAS'
    ]
  },
  'custom': {
    name: 'Custom',
    entrypoints: [],
    genesisHash: '',
    knownValidators: []
  }
};

export const useConfigStore = defineStore('config', {
  state: () => ({
    nodeConfig: {
      type: 'validator' as const,
      network: 'mainnet-beta' as SolanaNetwork,
      options: {
        // Basic required options
        identity: {
          id: 'identity',
          name: 'Identity Key',
          description: 'Path to the validator identity keypair',
          type: 'text',
          value: '/opt/solana/validator-keypair.json',
          required: true,
          category: 'basic',
        },
        ledger: {
          id: 'ledger',
          name: 'Ledger Directory',
          description: 'Path to the ledger directory',
          type: 'text',
          value: '/opt/solana/ledger',
          required: true,
          category: 'basic',
        },
        voteAccount: {
          id: 'voteAccount',
          name: 'Vote Account',
          description: 'Path to the vote account keypair (required for validators)',
          type: 'text',
          value: '/opt/solana/vote-account-keypair.json',
          required: false,
          category: 'basic',
        },
        logFile: {
          id: 'logFile',
          name: 'Log File',
          description: 'Path to log file',
          type: 'text',
          value: '/opt/solana/log',
          required: true,
          category: 'basic',
        },
        accountsDir: {
          id: 'accountsDir',
          name: 'Accounts Directory',
          description: 'Path to accounts directory',
          type: 'text',
          value: '/opt/solana/accounts',
          required: false,
          category: 'basic',
        },
        entrypoint: {
          id: 'entrypoint',
          name: 'Entrypoint',
          description: 'Solana gossip entrypoint address (handled automatically based on network)',
          type: 'text',
          value: SOLANA_NETWORKS['mainnet-beta'].entrypoints[0],
          required: true,
          category: 'network',
        },

        // Performance options
        accountsIndexLimit: {
          id: 'accountsIndexLimit',
          name: 'Accounts Index Limit',
          description: 'Maximum number of accounts indexed',
          type: 'number',
          value: null,
          required: false,
          category: 'performance',
        },
        accountsIndexMemoryLimit: {
          id: 'accountsIndexMemoryLimit',
          name: 'Accounts Index Memory Limit',
          description: 'Maximum size of accounts index in bytes',
          type: 'number',
          value: null,
          required: false,
          category: 'performance',
        },
        noSnapshotCompression: {
          id: 'noSnapshotCompression',
          name: 'Disable Snapshot Compression',
          description: 'Disable compression of snapshots',
          type: 'toggle',
          value: false,
          required: false,
          warning: 'Disabling snapshot compression will increase disk usage and network bandwidth',
          category: 'performance',
        },
        enableAccountsDbCaching: {
          id: 'enableAccountsDbCaching',
          name: 'Enable Accounts DB Caching',
          description: 'Enable accounts db caching',
          type: 'toggle',
          value: false,
          required: false,
          category: 'performance',
        },

        // Network options
        tpuForwardingAddrSet: {
          id: 'tpuForwardingAddrSet',
          name: 'Use TPU Forwarder',
          description: 'Use TPU forwarder address set',
          type: 'toggle',
          value: false,
          required: false,
          category: 'network',
        },
        privateRpcService: {
          id: 'privateRpcService',
          name: 'Private RPC Service',
          description: 'Run RPC services only for validators',
          type: 'toggle',
          value: false,
          required: false,
          category: 'network',
        },
        rpcPort: {
          id: 'rpcPort',
          name: 'RPC Port',
          description: 'Custom RPC port',
          type: 'number',
          value: 8899,
          required: false,
          category: 'network',
        },
        dynamicPortRange: {
          id: 'dynamicPortRange',
          name: 'Dynamic Port Range',
          description: 'Range of ports to use for dynamic connections (e.g., 8000-8020)',
          type: 'text',
          value: '8000-8020',
          required: true,
          category: 'network',
        },
        fullRpcApi: {
          id: 'fullRpcApi',
          name: 'Full RPC API',
          description: 'Enable the full JSON RPC API',
          type: 'toggle',
          value: false,
          required: false,
          category: 'network',
        },
        rpcBindAddress: {
          id: 'rpcBindAddress',
          name: 'RPC Bind Address',
          description: 'IP address to bind the RPC port to',
          type: 'text',
          value: '0.0.0.0',
          required: false,
          category: 'network',
        },

        // Advanced options
        limitLedgerSize: {
          id: 'limitLedgerSize',
          name: 'Limit Ledger Size',
          description: 'Target number of ledger shreds to keep',
          type: 'toggle',
          value: false,
          required: false,
          category: 'advanced',
        },
        noUntrustedRpcQueries: {
          id: 'noUntrustedRpcQueries',
          name: 'No Untrusted RPC Queries',
          description: 'Reject untrusted RPC queries',
          type: 'toggle',
          value: false,
          required: false,
          category: 'security',
          warning: 'Enabling this may break some applications that rely on advanced RPC features',
        },
        noPortCheck: {
          id: 'noPortCheck',
          name: 'Skip Port Check',
          description: 'Skip the port check for port availability',
          type: 'toggle',
          value: false,
          required: false,
          category: 'security',
          warning: 'Skipping port checks may cause network connectivity issues',
        },

        // New options
        knownValidator: {
          id: 'knownValidator',
          name: 'Known Validators',
          description: 'Known validator public keys (one per line)',
          type: 'text',
          value: '',
          required: false,
          category: 'network',
        },
        walRecoveryMode: {
          id: 'walRecoveryMode',
          name: 'WAL Recovery Mode',
          description: 'Write ahead log (WAL) recovery mode',
          type: 'select',
          value: '',
          required: false,
          category: 'advanced',
          options: [
            { value: 'tolerate_corrupted_tail_records', label: 'Tolerate Corrupted Tail Records' },
            { value: 'absolute_consistency', label: 'Absolute Consistency' },
            { value: 'point_in_time', label: 'Point in Time' },
            { value: 'skip_any_corrupted_record', label: 'Skip Any Corrupted Record' }
          ],
        },
        onlyKnownRpc: {
          id: 'onlyKnownRpc',
          name: 'Only Known RPC',
          description: 'Only use known RPC services',
          type: 'toggle',
          value: true,
          required: false,
          category: 'security',
        },
        noVoting: {
          id: 'noVoting',
          name: 'No Voting',
          description: 'Disable voting for RPC nodes',
          type: 'toggle',
          value: false,
          required: false,
          category: 'network',
        },

        // Additional Advanced Options
        accountIndexes: {
          id: 'accountIndexes',
          name: 'Account Indexes',
          description: 'Enable multiple account indexes',
          type: 'text',
          value: '',
          required: false,
          category: 'network',
          options: [
            { value: 'program-id', label: 'Program ID' },
            { value: 'spl-token-owner', label: 'SPL Token Owner' },
            { value: 'spl-token-mint', label: 'SPL Token Mint' }
          ],
        },
        accountsIndexBins: {
          id: 'accountsIndexBins',
          name: 'Accounts Index Bins',
          description: 'Number of bins to divide the accounts index into',
          type: 'number',
          value: null,
          required: false,
          category: 'advanced',
        },
        accountsShrinkRatio: {
          id: 'accountsShrinkRatio',
          name: 'Accounts Shrink Ratio',
          description: 'Specifies the shrink ratio for accounts (between 0.0 and 1.0)',
          type: 'text',
          value: '',
          required: false, 
          category: 'advanced',
        },
        authorizedVoter: {
          id: 'authorizedVoter',
          name: 'Authorized Voter Keypairs',
          description: 'Additional authorized voter keypairs (one per line)',
          type: 'text',
          value: '',
          required: false,
          category: 'advanced',
        },
        gossipValidator: {
          id: 'gossipValidator',
          name: 'Gossip Validators',
          description: 'Only gossip with these validators (one per line)',
          type: 'text', 
          value: '',
          required: false,
          category: 'advanced',
        },
        rpcMaxMultipleAccounts: {
          id: 'rpcMaxMultipleAccounts',
          name: 'RPC Max Multiple Accounts',
          description: 'Maximum accounts accepted by getMultipleAccounts JSON RPC method',
          type: 'number',
          value: null,
          required: false,
          category: 'advanced',
        },
        rpcMaxRequestBodySize: {
          id: 'rpcMaxRequestBodySize',
          name: 'RPC Max Request Body Size',
          description: 'Maximum request body size accepted by RPC service (bytes)',
          type: 'number',
          value: null,
          required: false,
          category: 'advanced',
        },
        rpcThreads: {
          id: 'rpcThreads',
          name: 'RPC Threads',
          description: 'Number of threads for servicing RPC requests',
          type: 'number',
          value: null,
          required: false,
          category: 'advanced',
        },
        skipStartupLedgerVerification: {
          id: 'skipStartupLedgerVerification',
          name: 'Skip Startup Ledger Verification',
          description: 'Skip ledger verification at validator bootup',
          type: 'toggle',
          value: false,
          required: false,
          category: 'advanced',
          warning: 'Skipping verification may lead to using corrupted ledger data',
        },
        snapshotArchiveFormat: {
          id: 'snapshotArchiveFormat',
          name: 'Snapshot Archive Format',
          description: 'Format to use for snapshot archives',
          type: 'select',
          value: '',
          required: false,
          category: 'advanced',
          options: [
            { value: 'zstd', label: 'ZSTD' },
            { value: 'lz4', label: 'LZ4' }
          ],
        },
        snapshotIntervalSlots: {
          id: 'snapshotIntervalSlots',
          name: 'Snapshot Interval Slots',
          description: 'Number of slots between generating snapshots',
          type: 'number',
          value: null,
          required: false,
          category: 'advanced',
        },
        waitForSupermajority: {
          id: 'waitForSupermajority',
          name: 'Wait For Supermajority',
          description: 'Wait until a supermajority of stake is visible on gossip before starting',
          type: 'number',
          value: null,
          required: false,
          category: 'advanced',
        }
      }
    } as NodeConfig,
    presets: [
      {
        name: 'Minimal Validator',
        description: 'Basic validator configuration with minimal options',
        config: {
          type: 'validator',
          network: 'mainnet-beta',
          options: {
            // Will be populated dynamically
          }
        }
      },
      {
        name: 'High-Performance RPC',
        description: 'Optimized for running as an RPC node with high performance',
        config: {
          type: 'rpc',
          network: 'mainnet-beta',
          options: {
            // Will be populated dynamically
          }
        }
      },
      {
        name: 'Testnet Node',
        description: 'Configuration for running a testnet node',
        config: {
          type: 'validator',
          network: 'testnet',
          options: {
            // Will be populated dynamically
          }
        }
      },
      {
        name: 'Testnet RPC Node',
        description: 'Optimized for running as a Testnet RPC node',
        config: {
          type: 'rpc',
          network: 'testnet',
          options: {
            // Will be populated dynamically
          }
        }
      }
    ] as Preset[]
  }),
  
  getters: {
    isValid(): boolean {
      const config = this.nodeConfig;
      const options = Object.values(config.options);
      
      // Check if all required fields are filled
      const requiredFilled = options
        .filter(option => option.required)
        .every(option => {
          if (typeof option.value === 'string') {
            return option.value.trim() !== '';
          }
          return option.value !== null;
        });
        
      // If node type is validator, vote account is required
      if (config.type === 'validator') {
        const voteAccount = config.options.voteAccount;
        if (!voteAccount || (typeof voteAccount.value === 'string' && voteAccount.value.trim() === '')) {
          return false;
        }
      }
      
      return requiredFilled;
    },
    
    getConfigByCategory(): Record<string, ConfigOption[]> {
      const result: Record<string, ConfigOption[]> = {
        basic: [],
        performance: [],
        security: [],
        network: [],
        advanced: []
      };
      
      Object.values(this.nodeConfig.options).forEach(option => {
        result[option.category].push(option);
      });
      
      return result;
    },
    
    currentNetworkInfo(): NetworkInfo {
      return SOLANA_NETWORKS[this.nodeConfig.network];
    },
    
    generateCliCommand(): string {
      const options = this.nodeConfig.options;
      let command = '#!/bin/bash\nexec solana-validator \\\n';
      
      // Add core parameters
      if (options.identity.value) {
        command += `    --identity ${options.identity.value} \\\n`;
      }
      
      if (options.voteAccount.value && this.nodeConfig.type === 'validator') {
        command += `    --vote-account ${options.voteAccount.value} \\\n`;
      }
      
      // Add no-voting for RPC nodes
      if (this.nodeConfig.type === 'rpc' && options.noVoting && options.noVoting.value === true) {
        command += `    --no-voting \\\n`;
      }
      
      // Add only-known-rpc flag if enabled
      if (options.onlyKnownRpc && options.onlyKnownRpc.value === true) {
        command += `    --only-known-rpc \\\n`;
      }
      
      // Add full-rpc-api flag if enabled
      if (options.fullRpcApi && options.fullRpcApi.value === true) {
        command += `    --full-rpc-api \\\n`;
      }
      
      // Handle special multi-valued known validator entries
      if (options.knownValidator && options.knownValidator.value) {
        const validators = (options.knownValidator.value as string)
          .split('\n')
          .filter(line => line.trim() !== '');
          
        validators.forEach(validator => {
          command += `    --known-validator ${validator.trim()} \\\n`;
        });
      }
      
      // Add optional log file
      if (options.logFile && options.logFile.value) {
        command += `    --log ${options.logFile.value} \\\n`;
      }
      
      // Add ledger directory
      if (options.ledger.value) {
        command += `    --ledger ${options.ledger.value} \\\n`;
      }
      
      // Add accounts directory
      if (options.accountsDir && options.accountsDir.value) {
        command += `    --accounts ${options.accountsDir.value} \\\n`;
      }
      
      // Add RPC port
      if (options.rpcPort && options.rpcPort.value) {
        command += `    --rpc-port ${options.rpcPort.value} \\\n`;
      }
      
      // Add RPC bind address
      if (options.rpcBindAddress && options.rpcBindAddress.value) {
        command += `    --rpc-bind-address ${options.rpcBindAddress.value} \\\n`;
      }
      
      // Add dynamic port range
      if (options.dynamicPortRange && options.dynamicPortRange.value) {
        command += `    --dynamic-port-range ${options.dynamicPortRange.value} \\\n`;
      }
      
      // Add all entrypoints from selected network
      const currentNetwork = this.nodeConfig.network;
      if (currentNetwork !== 'custom') {
        SOLANA_NETWORKS[currentNetwork].entrypoints.forEach(ep => {
          command += `    --entrypoint ${ep} \\\n`;
        });
      } else if (options.entrypoint.value) {
        command += `    --entrypoint ${options.entrypoint.value} \\\n`;
      }
      
      // Add expected genesis hash
      if (options.expectedGenesisHash && options.expectedGenesisHash.value) {
        command += `    --expected-genesis-hash ${options.expectedGenesisHash.value} \\\n`;
      }
      
      // Add WAL recovery mode
      if (options.walRecoveryMode && options.walRecoveryMode.value) {
        command += `    --wal-recovery-mode ${options.walRecoveryMode.value} \\\n`;
      }
      
      // Handle account indexes which can be multiple selections
      if (options.accountIndexes && options.accountIndexes.value) {
        const indexes = (options.accountIndexes.value as string).split(',');
        indexes.forEach(index => {
          if (index.trim()) {
            command += `    --account-index ${index.trim()} \\\n`;
          }
        });
      }
      
      // Handle limitLedgerSize as a toggle
      if (options.limitLedgerSize && options.limitLedgerSize.value === true) {
        command += `    --limit-ledger-size \\\n`;
      }
      
      // Add other options based on their values, skipping the special ones we've already handled
      Object.values(options).forEach(option => {
        const specialOptions = [
          'identity', 'ledger', 'voteAccount', 'entrypoint', 'knownValidator', 
          'onlyKnownRpc', 'logFile', 'accountsDir', 'rpcPort', 'dynamicPortRange',
          'expectedGenesisHash', 'walRecoveryMode', 'accountIndexes', 'fullRpcApi',
          'rpcBindAddress', 'limitLedgerSize', 'noVoting'
        ];
        
        if (specialOptions.includes(option.id)) {
          return; // Skip already handled options
        }
        
        if (option.type === 'toggle' && option.value === true) {
          command += `    --${option.id.replace(/([A-Z])/g, '-$1').toLowerCase()} \\\n`;
        } else if ((option.type === 'text' || option.type === 'select') && option.value) {
          command += `    --${option.id.replace(/([A-Z])/g, '-$1').toLowerCase()} ${option.value} \\\n`;
        } else if (option.type === 'number' && option.value !== null) {
          command += `    --${option.id.replace(/([A-Z])/g, '-$1').toLowerCase()} ${option.value} \\\n`;
        }
      });
      
      // Remove the trailing backslash and newline from the last option
      return command.slice(0, -3);
    },
    
    generateEnvFile(): string {
      const options = this.nodeConfig.options;
      let envContent = '# Solana Validator Configuration\n';
      
      // Add node type and network
      envContent += `NODE_TYPE=${this.nodeConfig.type.toUpperCase()}\n`;
      envContent += `SOLANA_NETWORK=${this.nodeConfig.network}\n\n`;
      
      // Core parameters
      envContent += '# Core Parameters\n';
      if (options.identity.value) {
        envContent += `IDENTITY_KEY="${options.identity.value}"\n`;
      }
      
      if (options.ledger.value) {
        envContent += `LEDGER_DIR="${options.ledger.value}"\n`;
      }
      
      if (options.voteAccount.value && this.nodeConfig.type === 'validator') {
        envContent += `VOTE_ACCOUNT="${options.voteAccount.value}"\n`;
      }
      
      // Add no-voting for RPC nodes
      if (this.nodeConfig.type === 'rpc' && options.noVoting && options.noVoting.value === true) {
        envContent += `NO_VOTING=true\n`;
      }
      
      // Add full-rpc-api if enabled
      if (options.fullRpcApi && options.fullRpcApi.value === true) {
        envContent += `FULL_RPC_API=true\n`;
      }
      
      // Add RPC bind address
      if (options.rpcBindAddress && options.rpcBindAddress.value) {
        envContent += `RPC_BIND_ADDRESS="${options.rpcBindAddress.value}"\n`;
      }
      
      // Handle entrypoints
      const currentNetwork = this.nodeConfig.network;
      if (currentNetwork !== 'custom') {
        // For predefined networks, add all entrypoints
        const entrypoints = SOLANA_NETWORKS[currentNetwork].entrypoints;
        entrypoints.forEach((ep, index) => {
          envContent += `ENTRYPOINT_${index + 1}="${ep}"\n`;
        });
      } else if (options.entrypoint.value) {
        // For custom network, add the single entrypoint
        envContent += `ENTRYPOINT="${options.entrypoint.value}"\n`;
      }
      
      // Handle known validators
      if (options.knownValidator && options.knownValidator.value) {
        const validators = (options.knownValidator.value as string)
          .split('\n')
          .filter(line => line.trim() !== '');
        
        validators.forEach((validator, index) => {
          envContent += `KNOWN_VALIDATOR_${index + 1}="${validator.trim()}"\n`;
        });
      }
      
      // Handle expected genesis hash
      if (options.expectedGenesisHash && options.expectedGenesisHash.value) {
        envContent += `EXPECTED_GENESIS_HASH="${options.expectedGenesisHash.value}"\n`;
      }
      
      // Handle account indexes which can be multiple selections
      if (options.accountIndexes && options.accountIndexes.value) {
        const indexes = (options.accountIndexes.value as string).split(',');
        indexes.forEach((index, i) => {
          if (index.trim()) {
            envContent += `ACCOUNT_INDEX_${i + 1}="${index.trim()}"\n`;
          }
        });
      }
      
      // Group other parameters by category
      const categories = ['network', 'performance', 'security', 'advanced'];
      
      for (const category of categories) {
        const categoryOptions = Object.values(options).filter(opt => opt.category === category);
        
        if (categoryOptions.length > 0) {
          envContent += `\n# ${category.charAt(0).toUpperCase() + category.slice(1)} Parameters\n`;
          
          categoryOptions.forEach(option => {
            if (option.id === 'identity' || option.id === 'ledger' || 
                option.id === 'voteAccount' || option.id === 'entrypoint' ||
                option.id === 'knownValidator' || option.id === 'expectedGenesisHash') {
              return; // Skip already handled options
            }
            
            const envKey = option.id.replace(/([A-Z])/g, '_$1').toUpperCase();
            
            if (option.type === 'toggle') {
              envContent += `${envKey}=${option.value ? 'true' : 'false'}\n`;
            } else if ((option.type === 'text' || option.type === 'select') && option.value) {
              envContent += `${envKey}="${option.value}"\n`;
            } else if (option.type === 'number' && option.value !== null) {
              envContent += `${envKey}=${option.value}\n`;
            }
          });
        }
      }
      
      return envContent;
    }
  },
  
  actions: {
    setNodeType(type: 'validator' | 'rpc') {
      this.nodeConfig.type = type;
      
      // Make vote account required for validators
      if (this.nodeConfig.options.voteAccount) {
        this.nodeConfig.options.voteAccount.required = type === 'validator';
      }
      
      // Set private RPC service to true for validators and false for RPC nodes
      this.updateOption('privateRpcService', type === 'validator');
      
      // Set dynamic port range as required for validators
      if (this.nodeConfig.options.dynamicPortRange) {
        this.nodeConfig.options.dynamicPortRange.required = type === 'validator';
      }
      
      // Set WAL recovery mode to 'skip_any_corrupted_record' by default for validators
      if (this.nodeConfig.options.walRecoveryMode) {
        this.updateOption('walRecoveryMode', 'skip_any_corrupted_record');
      }
      
      // Enable no-voting for RPC nodes
      if (type === 'rpc' && this.nodeConfig.options.noVoting) {
        this.updateOption('noVoting', true);
      } else if (type === 'validator' && this.nodeConfig.options.noVoting) {
        this.updateOption('noVoting', false);
      }
      
      // Enable full RPC API for RPC nodes
      if (type === 'rpc' && this.nodeConfig.options.fullRpcApi) {
        this.updateOption('fullRpcApi', true);
      } else if (type === 'validator' && this.nodeConfig.options.fullRpcApi) {
        this.updateOption('fullRpcApi', false);
      }
    },
    
    setNetwork(network: SolanaNetwork) {
      this.nodeConfig.network = network;
      
      // Update entrypoint options based on the selected network
      if (network !== 'custom') {
        const networkInfo = SOLANA_NETWORKS[network];
        const entrypointOption = this.nodeConfig.options.entrypoint;
        
        if (entrypointOption) {
          entrypointOption.options = networkInfo.entrypoints.map(ep => ({ value: ep, label: ep }));
          
          // Set the first entrypoint as default if the current value is empty or not in the new options
          if (!entrypointOption.value || 
              !networkInfo.entrypoints.includes(entrypointOption.value as string)) {
            entrypointOption.value = networkInfo.entrypoints[0];
          }
        }
        
        // Automatically apply the network's genesis hash and known validators
        this.updateOption('expectedGenesisHash', networkInfo.genesisHash);
        this.updateOption('knownValidator', networkInfo.knownValidators.join('\n'));
      } else {
        // For custom networks, clear these values
        this.updateOption('expectedGenesisHash', '');
        this.updateOption('knownValidator', '');
      }
    },
    
    updateOption(id: string, value: string | boolean | number | null) {
      if (this.nodeConfig.options[id]) {
        this.nodeConfig.options[id].value = value;
      }
    },
    
    applyPreset(presetName: string) {
      const preset = this.presets.find(p => p.name === presetName);
      if (!preset) return;
      
      // Set node type and network
      this.nodeConfig.type = preset.config.type;
      this.setNetwork(preset.config.network);
      
      // Apply preset values
      if (presetName === 'Minimal Validator') {
        this.setNodeType('validator');
        this.updateOption('enableAccountsDbCaching', true);
        this.updateOption('noSnapshotCompression', false);
        this.updateOption('tpuForwardingAddrSet', false);
        this.updateOption('privateRpcService', true);
        this.updateOption('onlyKnownRpc', true);
        this.updateOption('rpcPort', 8899);
        this.updateOption('limitLedgerSize', true);
        this.updateOption('logFile', '/var/log/solana-validator.log');
        this.updateOption('walRecoveryMode', 'skip_any_corrupted_record');
        this.updateOption('snapshotArchiveFormat', 'zstd');
        this.updateOption('accountsShrinkRatio', '0.8');
      } 
      else if (presetName === 'High-Performance RPC') {
        this.setNodeType('rpc');
        this.updateOption('enableAccountsDbCaching', true);
        this.updateOption('accountsIndexLimit', 10000000);
        this.updateOption('accountsIndexMemoryLimit', 300000000);
        this.updateOption('noSnapshotCompression', false);
        this.updateOption('tpuForwardingAddrSet', true);
        this.updateOption('privateRpcService', false);
        this.updateOption('onlyKnownRpc', true);
        this.updateOption('noVoting', true);
        this.updateOption('fullRpcApi', true);
        this.updateOption('rpcBindAddress', '0.0.0.0');
        this.updateOption('rpcPort', 8899);
        this.updateOption('accountsDir', '/mnt/accounts');
        this.updateOption('dynamicPortRange', '8000-8020');
        this.updateOption('walRecoveryMode', 'skip_any_corrupted_record');
        this.updateOption('accountIndexes', 'program-id,spl-token-owner,spl-token-mint');
        this.updateOption('limitLedgerSize', true);
        this.updateOption('snapshotArchiveFormat', 'zstd');
        this.updateOption('snapshotIntervalSlots', 100);
        this.updateOption('accountsShrinkRatio', '0.8');
        this.updateOption('rpcMaxMultipleAccounts', 100);
        this.updateOption('rpcMaxRequestBodySize', 51200);
        this.updateOption('rpcThreads', 48);
      }
      else if (presetName === 'Testnet Node') {
        this.setNodeType('validator');
        this.setNetwork('testnet');
        this.updateOption('entrypoint', SOLANA_NETWORKS['testnet'].entrypoints[0]);
        this.updateOption('enableAccountsDbCaching', true);
        this.updateOption('tpuForwardingAddrSet', true);
        this.updateOption('limitLedgerSize', true);
        this.updateOption('privateRpcService', false);
        this.updateOption('onlyKnownRpc', true);
        this.updateOption('logFile', '/var/log/solana-validator.log');
        this.updateOption('accountsDir', '/mnt/accounts');
        this.updateOption('dynamicPortRange', '8000-8020');
        this.updateOption('walRecoveryMode', 'skip_any_corrupted_record');
        this.updateOption('expectedGenesisHash', '4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY');
        this.updateOption('knownValidator', '5D1fNXzvv5NjV1ysLjirC4WY92RNsVH18vjmcszZd8on\n7XSY3MrYnK8vq693Rju17bbPkCN3Z7KvvfvJx4kdrsSY');
        this.updateOption('snapshotArchiveFormat', 'zstd');
        this.updateOption('accountsShrinkRatio', '0.8');
      }
      else if (presetName === 'Testnet RPC Node') {
        this.setNodeType('rpc');
        this.setNetwork('testnet');
        this.updateOption('enableAccountsDbCaching', true);
        this.updateOption('accountsIndexLimit', 10000000);
        this.updateOption('accountsIndexMemoryLimit', 300000000);
        this.updateOption('noSnapshotCompression', false);
        this.updateOption('tpuForwardingAddrSet', true);
        this.updateOption('privateRpcService', false);
        this.updateOption('onlyKnownRpc', true);
        this.updateOption('noVoting', true);
        this.updateOption('fullRpcApi', true);
        this.updateOption('rpcBindAddress', '0.0.0.0');
        this.updateOption('rpcPort', 8899);
        this.updateOption('ledger', '/mnt/ledger');
        this.updateOption('accountsDir', '/mnt/accounts');
        this.updateOption('logFile', '/home/sol/solana-rpc.log');
        this.updateOption('dynamicPortRange', '8000-8020');
        this.updateOption('walRecoveryMode', 'skip_any_corrupted_record');
        this.updateOption('expectedGenesisHash', '4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY');
        this.updateOption('knownValidator', '5D1fNXzvv5NjV1ysLjirC4WY92RNsVH18vjmcszZd8on\ndDzy5SR3AXdYWVqbDEkVFdvSPCtS9ihF5kJkHCtXoFs\neoKpUABi59aT4rR9HGS3LcMecfut9x7zJyodWWP43YQ\n7XSY3MrYnK8vq693Rju17bbPkCN3Z7KvvfvJx4kdrsSY\nFt5fbkqNa76vnsjYNwjDZUXoTWpP7VYm3mtsaQckQADN\n9QxCLckBiJc783jnMvXZubK4wH86Eqqvashtrwvcsgkv');
        this.updateOption('accountIndexes', 'program-id,spl-token-owner,spl-token-mint');
        this.updateOption('limitLedgerSize', true);
        this.updateOption('snapshotArchiveFormat', 'zstd');
        this.updateOption('snapshotIntervalSlots', 100);
        this.updateOption('accountsShrinkRatio', '0.8');
        this.updateOption('rpcMaxMultipleAccounts', 100);
        this.updateOption('rpcMaxRequestBodySize', 51200);
        this.updateOption('rpcThreads', 48);
      }
    }
  }
}); 