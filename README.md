# Advanced AI-Powered OSINT Toolkit

A comprehensive Open Source Intelligence (OSINT) toolkit with AI-powered threat assessment capabilities. This application provides automated intelligence gathering, risk analysis, and professional reporting for cybersecurity professionals.

## 🚀 Features

### Core Functionality
- **Multi-Input Support**: Email addresses, domains, IP addresses, and usernames
- **Automatic Input Detection**: Smart regex-based input type detection
- **Configurable Scan Depth**: Quick, Standard, and Deep scan options
- **AI-Powered Analysis**: GPT-based threat assessment and reporting
- **Real-time Progress**: Live scanning progress with detailed status updates

### Intelligence Sources
- **Have I Been Pwned**: Email breach detection
- **VirusTotal**: Domain and file reputation analysis
- **Shodan**: Network device and vulnerability scanning
- **AbuseIPDB**: IP address abuse and reputation checking
- **IPInfo**: Geolocation and organization data
- **WhoisXML**: Domain registration information
- **EmailRep**: Email reputation and risk assessment

### Advanced Features
- **Threat Timeline**: Chronological security events and indicators
- **Geolocation Mapping**: Interactive geographic intelligence
- **Risk Scoring Engine**: Composite threat assessment (0-100 scale)
- **Dark Web Monitoring**: Exposure analysis across underground platforms
- **Credential Analysis**: Pattern recognition and corporate format detection
- **MITRE ATT&CK Mapping**: Correlation with adversary tactics and techniques
- **Similarity Analysis**: AI-powered correlation with related targets
- **Temporal Awareness**: Data freshness tracking and cache management

### Export & Integration
- **Multiple Export Formats**: Markdown, JSON, CSV
- **Professional Reports**: Formatted, shareable intelligence reports
- **API Integration**: Ready for SIEM and security orchestration platforms
- **Rate Limiting**: Intelligent API usage management
- **Caching System**: Optimized performance with configurable TTL

## 🛠️ Setup & Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_HAVEIBEENPWNED_API_KEY=your_hibp_api_key_here
VITE_VIRUSTOTAL_API_KEY=your_virustotal_api_key_here
VITE_SHODAN_API_KEY=your_shodan_api_key_here
VITE_ABUSEIPDB_API_KEY=your_abuseipdb_api_key_here
VITE_IPINFO_TOKEN=your_ipinfo_token_here
VITE_WHOISXML_API_KEY=your_whoisxml_api_key_here
VITE_EMAILREP_API_KEY=your_emailrep_api_key_here

# Features
VITE_ENABLE_REAL_APIS=true
VITE_ENABLE_CACHING=true
VITE_CACHE_DURATION_HOURS=2
```

### API Key Setup

1. **Have I Been Pwned**: [Get API Key](https://haveibeenpwned.com/API/Key)
2. **VirusTotal**: [Get API Key](https://www.virustotal.com/gui/join-us)
3. **Shodan**: [Get API Key](https://account.shodan.io/)
4. **AbuseIPDB**: [Get API Key](https://www.abuseipdb.com/api)
5. **IPInfo**: [Get Token](https://ipinfo.io/signup)
6. **WhoisXML**: [Get API Key](https://whoisxmlapi.com/)
7. **EmailRep**: [Get API Key](https://emailrep.io/) (Optional)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd osint-toolkit

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔧 Usage

### Basic Scanning

1. **Input Target**: Enter an email, domain, IP address, or username
2. **Select Scan Depth**:
   - **Quick**: Basic checks (~30s)
   - **Standard**: Comprehensive analysis (~2m)
   - **Deep**: All sources and advanced features (~5m)
3. **Review Results**: AI-powered threat assessment with detailed findings

### Scan Depth Comparison

| Feature | Quick | Standard | Deep |
|---------|-------|----------|------|
| Basic Intelligence | ✅ | ✅ | ✅ |
| Reputation Checks | ✅ | ✅ | ✅ |
| Geolocation Data | ❌ | ✅ | ✅ |
| Timeline Analysis | ❌ | ✅ | ✅ |
| Dark Web Monitoring | ❌ | ❌ | ✅ |
| MITRE ATT&CK Mapping | ❌ | ❌ | ✅ |
| Similarity Analysis | ❌ | ❌ | ✅ |
| Advanced Correlation | ❌ | ❌ | ✅ |

### API vs Simulation Mode

- **Real API Mode**: Uses actual intelligence sources (requires API keys)
- **Simulation Mode**: Generates realistic dummy data for testing
- **Hybrid Mode**: Falls back to simulation if APIs are unavailable

## 📊 Risk Scoring

The toolkit uses a weighted scoring system (0-100):

- **Breach History** (0-25): Number and severity of data breaches
- **Infrastructure Age** (0-15): Domain age and registration patterns
- **Geographic Risk** (0-20): Location-based threat assessment
- **Blacklist Status** (0-20): Reputation across security databases
- **Security Scan Results** (0-20): Vulnerability and malware detections

### Risk Categories

- **🟢 Low Risk** (0-29): Minimal exposure indicators
- **🟠 Medium Risk** (30-69): Some security concerns identified
- **🔴 High Risk** (70-100): Significant threats detected

## 🔒 Security & Privacy

### Data Handling
- **No Data Storage**: All analysis is performed in real-time
- **Client-Side Processing**: Sensitive data never leaves your browser
- **Secure API Calls**: All external requests use HTTPS
- **Rate Limiting**: Prevents API abuse and ensures compliance

### Privacy Features
- **Anonymized Requests**: No personally identifiable information logged
- **Cache Encryption**: Temporary data is securely cached
- **Audit Trail**: Complete transparency in data sources used

## 🚨 Legal & Compliance

### Important Disclaimers

⚠️ **For Educational and Authorized Security Testing Only**

- Only use on systems you own or have explicit permission to test
- Comply with all applicable laws and regulations
- Respect API terms of service and rate limits
- Do not use for malicious purposes or unauthorized surveillance

### Responsible Use Guidelines

1. **Authorization**: Ensure proper authorization before scanning any target
2. **Scope Limitation**: Only gather intelligence within defined scope
3. **Data Protection**: Handle any discovered information responsibly
4. **Legal Compliance**: Follow local and international privacy laws
5. **Ethical Standards**: Maintain professional ethical standards

## 🛡️ Rate Limiting & API Management

### Built-in Protections
- **Intelligent Rate Limiting**: Respects API provider limits
- **Automatic Backoff**: Handles rate limit responses gracefully
- **Cache Optimization**: Reduces unnecessary API calls
- **Error Handling**: Graceful degradation when APIs are unavailable

### API Status Monitoring
- Real-time API health monitoring
- Cache hit/miss statistics
- Rate limit tracking
- Fallback to simulation mode

## 📈 Performance Optimization

### Caching Strategy
- **Intelligent TTL**: Configurable cache duration
- **Smart Invalidation**: Automatic cache cleanup
- **Memory Management**: Efficient browser memory usage
- **Background Updates**: Non-blocking cache refreshes

### Response Times
- **Quick Scan**: ~30 seconds
- **Standard Scan**: ~2 minutes
- **Deep Scan**: ~5 minutes
- **Cached Results**: Instant retrieval

## 🔧 Development

### Architecture
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: React hooks and context
- **API Layer**: Modular service architecture
- **Build Tool**: Vite for fast development

### Key Components
- `src/services/realOsintService.ts`: Real API integration
- `src/services/apiClient.ts`: HTTP client with rate limiting
- `src/utils/cache.ts`: Intelligent caching system
- `src/config/apiConfig.ts`: API configuration management

### Contributing
1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Submit a pull request
5. Follow code review process

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Troubleshooting
- Check API key configuration
- Verify network connectivity
- Review browser console for errors
- Ensure proper CORS configuration

### Common Issues
- **API Rate Limits**: Wait for rate limit reset or use caching
- **CORS Errors**: Use a proxy server for development
- **Missing Data**: Check API key permissions and quotas
- **Slow Performance**: Enable caching and use appropriate scan depth

### Getting Help
- Review documentation and examples
- Check GitHub issues for known problems
- Submit detailed bug reports with logs
- Join community discussions

---

**⚠️ Disclaimer**: This tool is for educational and authorized security testing purposes only. Users are responsible for ensuring compliance with all applicable laws and regulations.#   S i k k i m  
 