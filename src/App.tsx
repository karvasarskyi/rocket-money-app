import { useMemo, useState } from 'react'
import {
  Home, Users, Wallet, ListTodo, UserRound, Copy, ArrowUpRight,
  Rocket, ChevronRight, ShieldCheck, Clock3, CircleDollarSign, Gift,
  CheckCircle2, Menu, X
} from 'lucide-react'

type Tab = 'home' | 'referrals' | 'withdraw' | 'tasks' | 'profile'

const nav: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'referrals', label: 'Referrals', icon: Users },
  { id: 'withdraw', label: 'Withdraw', icon: Wallet },
  { id: 'tasks', label: 'Tasks', icon: ListTodo },
  { id: 'profile', label: 'Profile', icon: UserRound },
]

function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [amount, setAmount] = useState('25')
  const [wallet, setWallet] = useState('')
  const [copied, setCopied] = useState(false)
  const [notice, setNotice] = useState('')
  const balance = 5
  const referralLink = 'https://t.me/YourRocketBot?start=demo_user'
  const canWithdraw = Number(amount) >= 25 && Number(amount) <= balance && wallet.trim().length > 5

  const title = useMemo(() => nav.find(n => n.id === tab)?.label ?? 'Home', [tab])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setNotice('Copy is unavailable in this browser. Select and copy the link manually.')
    }
  }

  const requestWithdraw = () => {
    setNotice(canWithdraw
      ? 'Demo only: withdrawals are not connected yet. No payment has been requested.'
      : 'Enter a valid wallet address and an amount of at least $25. Available demo balance: $5.')
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <div className="brand"><div className="brand-mark"><Rocket size={19} /></div><span>ROCKET<span className="brand-light">MONEY</span></span></div>
        <div className="top-actions"><span className="online-dot" /> <span className="online-label">SYSTEM ONLINE</span><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button></div>
      </header>

      <div className="layout">
        <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
          <div className="side-label">WORKSPACE</div>
          {nav.map(item => {
            const Icon = item.icon
            return <button key={item.id} className={`nav-item ${tab === item.id ? 'active' : ''}`} onClick={() => { setTab(item.id); setMenuOpen(false); setNotice('') }}>
              <Icon size={18} /><span>{item.label}</span>{tab === item.id && <span className="nav-active-dot" />}
            </button>
          })}
          <div className="sidebar-bottom"><div className="secure-icon"><ShieldCheck size={17} /></div><div><strong>Secure account</strong><small>Your data stays protected</small></div></div>
        </aside>

        <main className="main-content">
          <div className="page-heading"><div><div className="eyebrow">YOUR DASHBOARD</div><h1>{title}<span className="heading-period">.</span></h1></div><div className="avatar">RM</div></div>

          {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice('')}>×</button></div>}

          {tab === 'home' && <HomePage balance={balance} setTab={setTab} />}
          {tab === 'referrals' && <Referrals copied={copied} copyLink={copyLink} />}
          {tab === 'withdraw' && <Withdraw amount={amount} setAmount={setAmount} wallet={wallet} setWallet={setWallet} canWithdraw={canWithdraw} requestWithdraw={requestWithdraw} balance={balance} />}
          {tab === 'tasks' && <Tasks />}
          {tab === 'profile' && <Profile />}
        </main>
      </div>
      <footer className="footer"><span>© 2026 ROCKET MONEY</span><span>BUILT FOR THE NEXT LEVEL <span className="footer-star">✦</span></span></footer>
    </div>
  )
}

function HomePage({ balance, setTab }: { balance: number; setTab: (tab: Tab) => void }) {
  return <>
    <section className="hero-card">
      <div className="hero-grid" />
      <div className="hero-content"><div className="hero-kicker"><span className="kicker-dot" /> TOTAL AVAILABLE BALANCE</div>
        <div className="balance"><span className="currency">$</span>{balance.toFixed(2)}</div>
        <p className="hero-sub">Your journey starts here. Invite friends and grow your balance.</p>
        <button className="primary-btn" onClick={() => setTab('referrals')}>Invite friends <ArrowUpRight size={17} /></button>
      </div>
      <div className="hero-orbit"><div className="orbit-ring ring-a" /><div className="orbit-ring ring-b" /><div className="planet"><Rocket size={34} /></div><span className="orbit-star star-a">✦</span><span className="orbit-star star-b">✧</span></div>
      <div className="hero-corner">RM / 001</div>
    </section>

    <div className="section-title"><div><div className="eyebrow">OVERVIEW</div><h2>Your activity</h2></div><span className="muted-tag">DEMO ACCOUNT</span></div>
    <div className="stats-grid">
      <div className="stat-card"><div className="stat-top"><span className="stat-icon purple"><Gift size={18} /></span><span className="stat-trend">WELCOME</span></div><div className="stat-value">$5.00</div><div className="stat-caption">Welcome bonus</div></div>
      <div className="stat-card"><div className="stat-top"><span className="stat-icon blue"><Users size={18} /></span><span className="stat-trend">LEVEL 01</span></div><div className="stat-value">0</div><div className="stat-caption">Direct referrals</div></div>
      <div className="stat-card"><div className="stat-top"><span className="stat-icon pink"><CircleDollarSign size={18} /></span><span className="stat-trend">LIFETIME</span></div><div className="stat-value">$0.00</div><div className="stat-caption">Referral earnings</div></div>
    </div>

    <div className="lower-grid">
      <section className="panel"><div className="panel-heading"><div><div className="eyebrow">GET STARTED</div><h3>Make your first move</h3></div><Rocket size={19} className="panel-rocket" /></div>
        <div className="step-row"><div className="step-number done"><CheckCircle2 size={17} /></div><div><strong>Create your account</strong><small>Your Rocket Money profile is ready</small></div><span className="step-status">DONE</span></div>
        <div className="step-row"><div className="step-number">02</div><div><strong>Invite your friends</strong><small>Earn $0.25 for every direct referral</small></div><button className="text-action" onClick={() => setTab('referrals')}>Start <ChevronRight size={15} /></button></div>
        <div className="step-row"><div className="step-number">03</div><div><strong>Request a payout</strong><small>Withdrawals start from $25</small></div><button className="text-action" onClick={() => setTab('withdraw')}>View <ChevronRight size={15} /></button></div>
      </section>
      <section className="panel earning-panel"><div className="eyebrow">REWARDS PROGRAM</div><h3>Grow together.</h3><p>Build your network and earn from every new member who joins through your link.</p><div className="reward-line"><span>Direct referral</span><strong>$0.25 <small>/ user</small></strong></div><div className="reward-line"><span>Second level</span><strong>$0.05 <small>/ user</small></strong></div><div className="panel-foot"><ShieldCheck size={15} /> Fair play. Real people. Verified activity.</div></section>
    </div>
  </>
}

function Referrals({ copied, copyLink }: { copied: boolean; copyLink: () => void }) {
  return <>
    <section className="intro-block"><div className="intro-icon"><Users size={23} /></div><div><h2>Your network, your rewards.</h2><p>Share your personal invite link and earn when friends join Rocket Money.</p></div></section>
    <section className="panel referral-link-panel"><div className="eyebrow">YOUR INVITE LINK</div><div className="link-box"><span>{'https://t.me/YourRocketBot?start=demo_user'}</span><button onClick={copyLink}><Copy size={16} />{copied ? 'Copied' : 'Copy link'}</button></div><div className="link-hint"><ShieldCheck size={14} /> Your referral code is unique to your account.</div></section>
    <div className="stats-grid referral-stats"><div className="stat-card"><div className="stat-top"><span className="stat-icon blue"><Users size={18} /></span></div><div className="stat-value">0</div><div className="stat-caption">Total invited</div></div><div className="stat-card"><div className="stat-top"><span className="stat-icon purple"><CircleDollarSign size={18} /></span></div><div className="stat-value">$0.00</div><div className="stat-caption">Total earned</div></div><div className="stat-card"><div className="stat-top"><span className="stat-icon pink"><Clock3 size={18} /></span></div><div className="stat-value">0</div><div className="stat-caption">Pending referrals</div></div></div>
    <section className="panel"><div className="panel-heading"><div><div className="eyebrow">COMMISSION STRUCTURE</div><h3>Two levels of rewards</h3></div></div><div className="commission-row"><div className="level-badge">01</div><div className="commission-copy"><strong>Direct referral</strong><small>A person joins using your invite link</small></div><strong className="commission-amount">$0.25</strong></div><div className="commission-row"><div className="level-badge second">02</div><div className="commission-copy"><strong>Second-level referral</strong><small>Your invited friend brings someone new</small></div><strong className="commission-amount">$0.05</strong></div></section>
  </>
}

function Withdraw({ amount, setAmount, wallet, setWallet, canWithdraw, requestWithdraw, balance }: {
  amount: string; setAmount: (v: string) => void; wallet: string; setWallet: (v: string) => void;
  canWithdraw: boolean; requestWithdraw: () => void; balance: number
}) {
  return <>
    <section className="withdraw-balance"><div><div className="eyebrow">AVAILABLE TO WITHDRAW</div><div className="withdraw-number">${balance.toFixed(2)}</div></div><div className="withdraw-symbol"><Wallet size={25} /></div></section>
    <section className="panel form-panel"><div className="eyebrow">PAYOUT DETAILS</div><h3>Request a withdrawal</h3><p className="form-description">Minimum withdrawal is $25. Your request will be reviewed before processing.</p>
      <label className="field-label" htmlFor="amount">Withdrawal amount (USD)</label><div className="input-wrap"><span>$</span><input id="amount" type="number" min="25" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="25.00" /></div>
      <label className="field-label" htmlFor="wallet">Wallet address</label><input className="text-input" id="wallet" value={wallet} onChange={e => setWallet(e.target.value)} placeholder="Enter your USDT wallet address" />
      <div className="withdraw-note"><ShieldCheck size={16} /><span>Double-check your wallet address. Transactions may be irreversible.</span></div>
      <button className="primary-btn full-btn" onClick={requestWithdraw}>Submit withdrawal request <ArrowUpRight size={17} /></button>
      <div className="demo-warning">DEMO MODE — payout processing is not connected.</div>
    </section>
  </>
}

function Tasks() {
  return <section className="empty-state panel"><div className="empty-icon"><ListTodo size={25} /></div><div className="eyebrow">COMING SOON</div><h2>New missions are on the way.</h2><p>Complete activities, unlock extra rewards, and level up your Rocket Money account.</p><span className="muted-tag">TASKS MODULE IN DEVELOPMENT</span></section>
}

function Profile() {
  return <section className="panel profile-panel"><div className="profile-avatar">RM</div><div><div className="eyebrow">ACCOUNT PROFILE</div><h2>Rocket Member</h2><p className="muted">Telegram account connection will appear here.</p></div><div className="profile-detail"><span>Account status</span><strong><span className="online-dot" /> Demo profile</strong></div><div className="profile-detail"><span>Member ID</span><strong>demo_user</strong></div><div className="profile-detail"><span>Joined</span><strong>—</strong></div><div className="profile-detail"><span>Payment method</span><strong>Not added</strong></div><div className="profile-foot"><ShieldCheck size={16} /> Account verification and security settings will be available after backend integration.</div></section>
}

export default App
