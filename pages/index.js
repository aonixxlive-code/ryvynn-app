import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [streak, setStreak] = useState(0)
  const [tokens, setTokens] = useState(0)
  const [userLocation, setUserLocation] = useState('Detecting location...')
  const [miracleStory, setMiracleStory] = useState('Loading inspiration...')
  const [activeTab, setActiveTab] = useState('home')
  const [earnings, setEarnings] = useState(0)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)

  const miracleStories = [
    "The Black Lotus saved my life. 90 days clean, earning $127/month from my anonymous recovery data helping others. Finally, my pain has purpose.",
    "RYVYNN helped me through my darkest hour. Now 45 days sober and my data is funding therapy for 3 other people. This is healing in action.",
    "Anonymous confessions + AI guidance changed everything. 6 months depression-free, $89/month passive income from my wellness data.",
    "The panic button literally saved my life. Now I help others by sharing my recovery patterns. $156/month and growing.",
    "Soul Tokens gave me purpose. 120 days of healing, donated to 8 families in crisis. My pain is helping others heal."
  ]

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load user data
      const savedStreak = localStorage.getItem('ryvynn_streak') || 0
      const savedTokens = localStorage.getItem('ryvynn_tokens') || 0
      setStreak(savedStreak)
      setTokens(savedTokens)

      // Load miracle story
      const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
      const storyIndex = dayOfYear % miracleStories.length
      setMiracleStory(miracleStories[storyIndex])

      // Detect location
      detectLocation()
      
      // Create cosmos
      setTimeout(createCosmos, 100)
      
      // Update earnings
      updateEarnings()
    }
  }, [])

  const detectLocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      setUserLocation(`${data.city}, ${data.region}`)
    } catch {
      setUserLocation('Your Location')
    }
  }

  const createCosmos = () => {
    const cosmos = document.getElementById('cosmos')
    if (!cosmos) return
    
    cosmos.innerHTML = '' // Clear existing stars
    
    for (let i = 0; i < 150; i++) {
      const star = document.createElement('div')
      star.className = 'star'
      star.style.position = 'absolute'
      star.style.background = 'white'
      star.style.borderRadius = '50%'
      star.style.left = Math.random() * 100 + '%'
      star.style.top = Math.random() * 100 + '%'
      star.style.width = star.style.height = (Math.random() * 3 + 1) + 'px'
      star.style.animationDelay = Math.random() * 4 + 's'
      cosmos.appendChild(star)
    }
  }

  const updateEarnings = () => {
    // Simulate default earnings
    setEarnings(247)
  }

  const checkIn = () => {
    const today = new Date().toDateString()
    const lastCheckIn = localStorage.getItem('ryvynn_last_checkin')
    const currentStreak = parseInt(localStorage.getItem('ryvynn_streak') || '0')
    const currentTokens = parseInt(localStorage.getItem('ryvynn_tokens') || '0')
    
    if (lastCheckIn === today) return

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const newStreak = (lastCheckIn === yesterday.toDateString()) ? currentStreak + 1 : 1
    
    const tokenBonus = Math.floor(newStreak / 7)
    const newTokens = currentTokens + 5 + tokenBonus
    
    localStorage.setItem('ryvynn_streak', newStreak)
    localStorage.setItem('ryvynn_tokens', newTokens)
    localStorage.setItem('ryvynn_last_checkin', today)
    
    setStreak(newStreak)
    setTokens(newTokens)
    
    const btn = document.getElementById('checkInBtn')
    if (btn) {
      btn.textContent = "CHECKED IN! ✓"
      btn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)"
      btn.disabled = true
    }
  }

  const processSubscription = async () => {
    const email = document.getElementById('subscribeEmail')?.value
    if (!email) {
      alert('Please enter your email address')
      return
    }

    alert('Stripe integration ready! Add your environment variables to complete.')
  }

  const switchTab = (tabName) => {
    setActiveTab(tabName)
  }

  const triggerPanic = () => {
    if (confirm('🚨 EMERGENCY MODE\n\nCall 988 now for immediate crisis support?\n\nOr press Cancel for other resources.')) {
      window.open('tel:988')
    } else {
      setActiveTab('crisis')
    }
  }

  return (
    <>
      <Head>
        <title>RYVYNN - Black Lotus Mental Wellness | Own Your Data, Heal Your Soul</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <script src="https://js.stripe.com/v3/"></script>
      </Head>
      
      <div>
        {/* GIANT BLACK LOTUS BACKGROUND */}
        <div className="giant-lotus-bg">
          <div className="giant-lotus-petals">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="giant-petal"></div>
            ))}
          </div>
          <div className="giant-lotus-center"></div>
        </div>

        {/* Cosmos Stars */}
        <div className="cosmos" id="cosmos"></div>
        
        <div className="app-container">
          {/* Header */}
          <div className="header">
            <div className="logo-text">RYVYNN</div>
            <div className="tagline">
              <div className="security-badge">
                🔒 100% ANONYMOUS • ZERO SURVEILLANCE • YOUR DATA, YOUR PROFIT
              </div>
            </div>
            <div className="nav-tabs">
              <div className={`nav-tab ${activeTab === 'home' ? 'active' : ''}`} onClick={() => switchTab('home')}>HOME</div>
              <div className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => switchTab('profile')}>PROFILE</div>
              <div className={`nav-tab ${activeTab === 'data' ? 'active' : ''}`} onClick={() => switchTab('data')}>💰 DATA</div>
              <div className={`nav-tab ${activeTab === 'advice' ? 'active' : ''}`} onClick={() => switchTab('advice')}>ADVICE</div>
              <div className={`nav-tab ${activeTab === 'crisis' ? 'active' : ''}`} onClick={() => switchTab('crisis')}>CRISIS</div>
            </div>
          </div>

          {/* Home Content */}
          <div className={`content ${activeTab === 'home' ? 'active' : ''}`}>
            {/* Plus Upgrade Banner */}
            <div className="plus-banner" onClick={() => setIsUpgradeModalOpen(true)}>
              <div className="plus-title">⚡ UPGRADE TO RYVYNN PLUS</div>
              <div className="plus-price">$19<span style={{fontSize: '24px'}}>/month</span></div>
              <div className="plus-features">
                Avatar Legacy • Advanced Analytics • Wearables • Data Rights
              </div>
            </div>

            <div className="wellness-stats">
              <div className="streak-number">{streak}</div>
              <div style={{color: 'var(--cyber-gray-300)', marginBottom: '10px'}}>Days of Healing</div>
              <div className="soul-tokens-count">
                <span style={{color: 'var(--cyber-gray-300)', fontSize: '14px'}}>Soul Tokens:</span> 
                <span>{tokens}</span>
              </div>
              <button className="check-in-btn" onClick={checkIn} id="checkInBtn">
                Daily Check-In (+5 Soul Tokens)
              </button>
            </div>

            <div className="miracle-box">
              <h3 style={{color: 'var(--sacred-gold)', marginBottom: '10px'}}>Today's Miracle</h3>
              <p style={{lineHeight: '1.6', color: 'var(--cyber-gray-100)'}}>
                {miracleStory}
              </p>
              <p style={{marginTop: '10px', color: 'var(--cyber-gray-300)', fontSize: '14px'}}>— Anonymous, verified user</p>
            </div>
          </div>

          {/* Data Content */}
          <div className={`content ${activeTab === 'data' ? 'active' : ''}`}>
            <div className="data-marketplace">
              <div className="marketplace-header">
                <div className="marketplace-title">💰 DATA MARKETPLACE</div>
                <div className="marketplace-subtitle">Your Recovery Journey = Your Income Stream</div>
              </div>
              <div className="earning-display">
                <div className="earning-label">Monthly Earnings Potential</div>
                <div className="earning-amount">${earnings}</div>
                <div style={{color: 'var(--cyber-gray-300)', fontSize: '12px', marginTop: '8px'}}>
                  Based on your current data sharing settings
                </div>
              </div>
            </div>
          </div>

          {/* Crisis Content */}
          <div className={`content ${activeTab === 'crisis' ? 'active' : ''}`}>
            <div className="crisis-panel">
              <h2 style={{color: 'var(--neon-red)', marginBottom: '15px', textAlign: 'center'}}>24/7 Crisis Support</h2>
              <button className="crisis-btn primary" onClick={() => window.open('tel:988')}>
                📞 Call 988 Now
              </button>
              <button className="crisis-btn secondary" onClick={() => window.open('sms:741741?body=HOME')}>
                💬 Text HOME to 741741
              </button>
              
              <div style={{marginTop: '20px', padding: '15px', background: 'rgba(255, 7, 58, 0.1)', borderRadius: '12px', textAlign: 'left'}}>
                <div style={{color: 'var(--neon-red)', fontWeight: '700', marginBottom: '8px'}}>⚠️ Emergency Resources</div>
                <div style={{color: 'var(--cyber-gray-300)', fontSize: '12px', lineHeight: '1.5'}}>
                  • 988: Suicide & Crisis Lifeline<br/>
                  • 911: Medical Emergency<br/>
                  • 741741: Crisis Text Line<br/>
                  • RYVYNN is not a medical provider
                </div>
              </div>
            </div>
          </div>

          {/* Other tabs */}
          <div className={`content ${activeTab === 'profile' ? 'active' : ''}`}>
            <div className="profile-panel">
              <h3 style={{color: 'var(--neon-red)', textAlign: 'center', marginBottom: '20px'}}>Your Profile</h3>
              <div className="location-display">
                <div className="location-icon">📍</div>
                <div className="location-info">
                  <div className="location-text">Your healing resources for</div>
                  <div className="location-city">{userLocation}</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`content ${activeTab === 'advice' ? 'active' : ''}`}>
            <div className="advice-panel">
              <h2 style={{color: 'var(--neon-red)', marginBottom: '10px', textAlign: 'center'}}>AI Healing Guides</h2>
              <p style={{color: 'var(--cyber-gray-100)', textAlign: 'center'}}>Three personalities. Nine voice combinations. Infinite support.</p>
              
              <div style={{marginTop: '20px', padding: '15px', background: 'rgba(255, 7, 58, 0.1)', borderRadius: '12px'}}>
                <div style={{color: 'var(--neon-red)', fontWeight: '700', marginBottom: '10px'}}>🤖 Coming Soon in Plus</div>
                <div style={{color: 'var(--cyber-gray-300)', fontSize: '14px'}}>
                  • Normal Mode (Empathetic)<br/>
                  • Formal Mode (Clinical)<br/>
                  • Unhinged Mode (Raw Truth)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panic Button */}
        <button className="panic-button" onClick={triggerPanic}>PANIC</button>

        {/* Upgrade Modal */}
        {isUpgradeModalOpen && (
          <div className="modal active">
            <div className="modal-content">
              <h2 style={{color: 'var(--neon-red)', textAlign: 'center', marginBottom: '20px'}}>
                Upgrade to RYVYNN Plus
              </h2>
              
              <div style={{marginBottom: '20px', textAlign: 'center'}}>
                <div style={{fontSize: '48px', fontWeight: '900', color: 'var(--neon-red)'}}>
                  $19<span style={{fontSize: '24px'}}>/month</span>
                </div>
              </div>

              <ul style={{marginBottom: '20px', lineHeight: '1.8'}}>
                <li>✓ Avatar Legacy System</li>
                <li>✓ Advanced Personalization</li>
                <li>✓ Wearables Integration</li>
                <li>✓ Data Monetization</li>
                <li>✓ Priority Support</li>
                <li>✓ Advanced Analytics</li>
              </ul>

              <input type="email" id="subscribeEmail" placeholder="Enter your email" style={{width: '100%', padding: '12px', marginBottom: '20px', background: 'rgba(31, 41, 55, 0.8)', border: '1px solid var(--neon-red)', borderRadius: '8px', color: 'white', fontSize: '16px'}} />

              <div style={{display: 'flex', gap: '10px'}}>
                <button onClick={() => setIsUpgradeModalOpen(false)} style={{flex: 1, padding: '12px', background: 'transparent', border: '1px solid var(--cyber-gray-600)', borderRadius: '8px', color: 'var(--cyber-gray-300)', cursor: 'pointer'}}>
                  Cancel
                </button>
                <button onClick={processSubscription} style={{flex: 2, padding: '12px', background: 'linear-gradient(135deg, var(--neon-red) 0%, var(--neon-pink) 100%)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: '700'}}>
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
          }

          :root {
            --lotus-black: #000000;
            --lotus-red: #ef4444;
            --lotus-red-dark: #dc2626;
            --neon-red: #ff073a;
            --neon-pink: #ff0f7b;
            --cyber-gray-100: #f3f4f6;
            --cyber-gray-300: #d1d5db;
            --cyber-gray-600: #4b5563;
            --cyber-gray-800: #1f2937;
            --sacred-gold: #ffd700;
            --data-green: #10b981;
          }

          body {
            font-family: -apple-system, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif;
            background: #000000;
            color: #ffffff;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
          }

          .giant-lotus-bg {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 800px;
            height: 800px;
            z-index: 0;
            opacity: 0.3;
            animation: lotus-morph 20s infinite;
            pointer-events: none;
          }

          @keyframes lotus-morph {
            0%, 100% {
              filter: drop-shadow(0 0 100px rgba(255, 7, 58, 0.8));
              transform: translate(-50%, -50%) scale(1) rotate(0deg);
            }
            50% {
              filter: drop-shadow(0 0 150px rgba(139, 0, 0, 1));
              transform: translate(-50%, -50%) scale(1.2) rotate(90deg);
            }
          }

          .giant-lotus-petals {
            position: absolute;
            width: 100%;
            height: 100%;
            animation: rotate-slow 60s linear infinite;
          }

          @keyframes rotate-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .giant-petal {
            position: absolute;
            width: 200px;
            height: 300px;
            background: linear-gradient(135deg, 
              rgba(255, 7, 58, 0.4) 0%, 
              rgba(139, 0, 0, 0.3) 50%,
              rgba(0, 0, 0, 0.2) 100%);
            border-radius: 0 50% 50% 50%;
            left: 50%;
            top: 50%;
            transform-origin: bottom center;
          }

          .giant-petal:nth-child(1) { transform: translate(-50%, -50%) rotate(0deg) translateY(-150px); }
          .giant-petal:nth-child(2) { transform: translate(-50%, -50%) rotate(45deg) translateY(-150px); }
          .giant-petal:nth-child(3) { transform: translate(-50%, -50%) rotate(90deg) translateY(-150px); }
          .giant-petal:nth-child(4) { transform: translate(-50%, -50%) rotate(135deg) translateY(-150px); }
          .giant-petal:nth-child(5) { transform: translate(-50%, -50%) rotate(180deg) translateY(-150px); }
          .giant-petal:nth-child(6) { transform: translate(-50%, -50%) rotate(225deg) translateY(-150px); }
          .giant-petal:nth-child(7) { transform: translate(-50%, -50%) rotate(270deg) translateY(-150px); }
          .giant-petal:nth-child(8) { transform: translate(-50%, -50%) rotate(315deg) translateY(-150px); }

          .giant-lotus-center {
            position: absolute;
            width: 150px;
            height: 150px;
            background: radial-gradient(circle, 
              rgba(255, 7, 58, 0.8) 0%, 
              rgba(139, 0, 0, 0.6) 50%,
              rgba(0, 0, 0, 0.9) 100%);
            border-radius: 50%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            animation: pulse-core 3s ease-in-out infinite;
          }

          @keyframes pulse-core {
            0%, 100% { 
              box-shadow: 0 0 100px rgba(255, 7, 58, 0.8);
            }
            50% { 
              box-shadow: 0 0 150px rgba(255, 7, 58, 1);
            }
          }

          .cosmos {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
          }

          .star {
            animation: twinkle 4s infinite;
          }

          @keyframes twinkle {
            0%, 100% { 
              opacity: 0;
              transform: scale(0.5);
            }
            50% { 
              opacity: 1;
              transform: scale(1.2);
              filter: brightness(1.5) drop-shadow(0 0 6px currentColor);
            }
          }

          .app-container {
            max-width: 428px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(180deg, 
              rgba(0, 0, 0, 0.9) 0%, 
              rgba(31, 41, 55, 0.85) 50%, 
              rgba(0, 0, 0, 0.9) 100%);
            position: relative;
            z-index: 1;
            backdrop-filter: blur(10px);
          }

          .header {
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 100%);
            padding: 20px;
            text-align: center;
            border-bottom: 2px solid rgba(255, 7, 58, 0.3);
          }

          .logo-text {
            font-size: 42px;
            font-weight: 900;
            letter-spacing: 5px;
            background: linear-gradient(45deg, var(--neon-red), var(--neon-pink), var(--neon-red));
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient-shift 3s ease infinite;
          }

          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          .security-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--sacred-gold);
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
            padding: 8px 16px;
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%);
            border: 1px solid rgba(255, 215, 0, 0.4);
            border-radius: 20px;
            animation: glow-badge 2s ease-in-out infinite;
          }

          @keyframes glow-badge {
            0%, 100% { box-shadow: 0 0 10px rgba(255, 215, 0, 0.3); }
            50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
          }

          .nav-tabs {
            display: flex;
            padding: 15px 20px 0;
            gap: 8px;
          }

          .nav-tab {
            flex: 1;
            padding: 12px 8px;
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid transparent;
            color: var(--cyber-gray-300);
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.5px;
            border-radius: 12px 12px 0 0;
          }

          .nav-tab.active {
            background: rgba(255, 7, 58, 0.2);
            border-color: var(--neon-red);
            color: white;
            box-shadow: 0 0 15px rgba(255, 7, 58, 0.4);
          }

          .content {
            padding: 20px;
            display: none;
          }

          .content.active {
            display: block;
          }

          .plus-banner {
            background: linear-gradient(135deg, rgba(255, 7, 58, 0.3) 0%, rgba(255, 15, 123, 0.2) 100%);
            border: 2px solid var(--neon-red);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 0 30px rgba(255, 7, 58, 0.3);
          }

          .plus-banner:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 40px rgba(255, 7, 58, 0.5);
          }

          .plus-title {
            color: var(--neon-red);
            font-size: 24px;
            font-weight: 900;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(255, 7, 58, 0.8);
          }

          .plus-price {
            font-size: 48px;
            font-weight: 900;
            color: white;
            margin-bottom: 10px;
          }

          .plus-features {
            font-size: 12px;
            color: var(--cyber-gray-100);
            line-height: 1.5;
          }

          .wellness-stats {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%);
            border: 2px solid var(--neon-red);
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 20px;
            text-align: center;
          }

          .streak-number {
            font-size: 72px;
            font-weight: 900;
            background: linear-gradient(45deg, var(--neon-red), var(--neon-pink));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .soul-tokens-count {
            color: var(--sacred-gold);
            font-size: 32px;
            font-weight: 700;
            margin-top: 10px;
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
          }

          .check-in-btn {
            width: 100%;
            padding: 20px;
            background: linear-gradient(135deg, var(--neon-red) 0%, var(--neon-pink) 100%);
            color: white;
            border: none;
            border-radius: 16px;
            font-weight: 900;
            font-size: 18px;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s;
          }

          .check-in-btn:hover {
            transform: translateY(-2px);
          }

          .miracle-box {
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
            border: 1px solid var(--sacred-gold);
            border-radius: 16px;
            padding: 20px;
            text-align: center;
          }

          .data-marketplace {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%);
            border: 2px solid var(--data-green);
            border-radius: 20px;
            padding: 25px;
          }

          .marketplace-title {
            color: var(--data-green);
            font-size: 24px;
            font-weight: 900;
            margin-bottom: 8px;
            text-shadow: 0 0 20px rgba(16, 185, 129, 0.8);
          }

          .marketplace-subtitle {
            color: var(--cyber-gray-100);
            font-size: 14px;
          }

          .earning-display {
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid var(--data-green);
            border-radius: 16px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
          }

          .earning-label {
            color: var(--cyber-gray-300);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
          }

          .earning-amount {
            color: var(--data-green);
            font-size: 48px;
            font-weight: 900;
            text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
          }

          .crisis-panel {
            background: rgba(239, 68, 68, 0.2);
            border: 2px solid var(--neon-red);
            border-radius: 20px;
            padding: 25px;
          }

          .crisis-btn {
            width: 100%;
            padding: 20px;
            border: none;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 900;
            cursor: pointer;
            margin-bottom: 10px;
          }

          .crisis-btn.primary {
            background: var(--neon-red);
            color: white;
          }

          .crisis-btn.secondary {
            background: #2563eb;
            color: white;
          }

          .location-display {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(37, 99, 235, 0.1);
            border: 1px solid rgba(37, 99, 235, 0.3);
            border-radius: 12px;
            padding: 12px;
          }

          .location-icon {
            font-size: 20px;
          }

          .location-info {
            flex: 1;
          }

          .location-text {
            color: var(--cyber-gray-100);
            font-size: 12px;
          }

          .location-city {
            color: #60a5fa;
            font-weight: 700;
          }

          .profile-panel, .advice-panel {
            background: linear-gradient(135deg, rgba(139, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%);
            border: 2px solid var(--neon-red);
            border-radius: 20px;
            padding: 20px;
          }

          .panic-button {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 90px;
            height: 90px;
            background: radial-gradient(circle, var(--neon-red) 0%, var(--lotus-red-dark) 100%);
            border: 4px solid var(--neon-red);
            border-radius: 50%;
            color: white;
            font-weight: 900;
            cursor: pointer;
            z-index: 1000;
            animation: panic-pulse 1.5s ease-in-out infinite;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          @keyframes panic-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            padding: 20px;
          }

          .modal.active {
            display: flex;
          }

          .modal-content {
            background: linear-gradient(135deg, rgba(255, 7, 58, 0.2) 0%, rgba(0, 0, 0, 0.95) 100%);
            border: 2px solid var(--neon-red);
            border-radius: 20px;
            padding: 30px;
            max-width: 400px;
            width: 100%;
            color: white;
          }
        `}</style>
      </div>
    </>
  )
}
