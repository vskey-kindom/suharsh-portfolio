import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ROLES = [
  { id: 'buyer', label: 'Buyer' },
  { id: 'supplier', label: 'Supplier' },
]

/** Abstract diagram of the two-sided brokerage: pick a side to see its portal. */
export default function VskeyPreview() {
  const [role, setRole] = useState('buyer')

  return (
    <div className="pv pv-vskey">
      <div className="pv-grid" aria-hidden="true" />

      <div className="vk-diagram" role="tablist" aria-label="Choose a portal">
        <button
          role="tab"
          id="vk-tab-buyer"
          aria-selected={role === 'buyer'}
          aria-controls="vk-panel"
          className={`vk-node ${role === 'buyer' ? 'on' : ''}`}
          onClick={() => setRole('buyer')}
        >
          Buyer
        </button>
        <div className={`vk-link ${role === 'buyer' ? 'flow-right' : ''}`} aria-hidden="true">
          <span />
        </div>
        <div className="vk-core" aria-hidden="true">
          <b>VSKEY</b>
          <small>Brokerage</small>
        </div>
        <div className={`vk-link ${role === 'supplier' ? 'flow-left' : ''}`} aria-hidden="true">
          <span />
        </div>
        <button
          role="tab"
          id="vk-tab-supplier"
          aria-selected={role === 'supplier'}
          aria-controls="vk-panel"
          className={`vk-node ${role === 'supplier' ? 'on' : ''}`}
          onClick={() => setRole('supplier')}
        >
          Supplier
        </button>
      </div>

      <div className="vk-stage" id="vk-panel" role="tabpanel" aria-labelledby={`vk-tab-${role}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            className="vk-panel"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="vk-panel-head">
              <span className="label">{ROLES.find((r) => r.id === role).label} portal</span>
              <span className="vk-auth">Authentication</span>
            </div>
            <div className="vk-bars" aria-hidden="true">
              <span style={{ width: '82%' }} />
              <span style={{ width: '64%' }} />
              <span style={{ width: '74%' }} />
              <span style={{ width: '48%' }} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
