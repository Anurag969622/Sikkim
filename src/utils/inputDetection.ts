export function detectInputType(input: string): 'email' | 'domain' | 'ip' | 'username' | null {
  const trimmedInput = input.trim();
  
  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(trimmedInput)) {
    return 'email';
  }
  
  // IP address regex (IPv4)
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipRegex.test(trimmedInput)) {
    return 'ip';
  }
  
  // Domain regex (basic)
  const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  if (domainRegex.test(trimmedInput)) {
    return 'domain';
  }
  
  // Username (alphanumeric with underscores, hyphens, dots)
  const usernameRegex = /^[a-zA-Z0-9._-]+$/;
  if (usernameRegex.test(trimmedInput) && trimmedInput.length >= 3) {
    return 'username';
  }
  
  return null;
}

export function validateInput(input: string, type: string): boolean {
  const detected = detectInputType(input);
  return detected === type;
}