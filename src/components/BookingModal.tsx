import React, { useState } from 'react';
import { Calendar, Clock, Users, CreditCard, Check, X } from 'lucide-react';

interface BookingModalProps {
  onClose: () => void;
  language: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ onClose, language }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    tourType: '',
    date: '',
    time: '',
    visitors: 1,
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const translations = {
    english: {
      title: "Book Your Experience",
      step1: "Select Tour",
      step2: "Details",
      step3: "Payment",
      step4: "Confirmation",
      tourType: "Tour Type",
      virtualTour: "Virtual Tour",
      guidedTour: "Guided Tour",
      culturalExperience: "Cultural Experience",
      meditationRetreat: "Meditation Retreat",
      selectDate: "Select Date",
      selectTime: "Select Time",
      numberOfVisitors: "Number of Visitors",
      personalInfo: "Personal Information",
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      specialRequests: "Special Requests",
      paymentMethod: "Payment Method",
      creditCard: "Credit Card",
      paypal: "PayPal",
      bankTransfer: "Bank Transfer",
      cardNumber: "Card Number",
      expiryDate: "Expiry Date",
      cvv: "CVV",
      cardholderName: "Cardholder Name",
      next: "Next",
      back: "Back",
      confirm: "Confirm Booking",
      cancel: "Cancel",
      bookingConfirmed: "Booking Confirmed!",
      bookingId: "Booking ID",
      thankYou: "Thank you for your booking. You will receive a confirmation email shortly.",
      close: "Close"
    },
    nepali: {
      title: "आफ्नो अनुभव बुक गर्नुहोस्",
      step1: "टुर छान्नुहोस्",
      step2: "विवरणहरू",
      step3: "भुक्तानी",
      step4: "पुष्टिकरण",
      tourType: "टुरको प्रकार",
      virtualTour: "भर्चुअल टुर",
      guidedTour: "गाइडेड टुर",
      culturalExperience: "सांस्कृतिक अनुभव",
      meditationRetreat: "ध्यान रिट्रिट",
      selectDate: "मिति छान्नुहोस्",
      selectTime: "समय छान्नुहोस्",
      numberOfVisitors: "आगन्तुकहरूको संख्या",
      personalInfo: "व्यक्तिगत जानकारी",
      fullName: "पूरा नाम",
      email: "ईमेल ठेगाना",
      phone: "फोन नम्बर",
      specialRequests: "विशेष अनुरोधहरू",
      paymentMethod: "भुक्तानी विधि",
      creditCard: "क्रेडिट कार्ड",
      paypal: "PayPal",
      bankTransfer: "बैंक ट्रान्सफर",
      cardNumber: "कार्ड नम्बर",
      expiryDate: "म्याद सकिने मिति",
      cvv: "CVV",
      cardholderName: "कार्डधारकको नाम",
      next: "अर्को",
      back: "फिर्ता",
      confirm: "बुकिङ पुष्टि गर्नुहोस्",
      cancel: "रद्द गर्नुहोस्",
      bookingConfirmed: "बुकिङ पुष्टि भयो!",
      bookingId: "बुकिङ ID",
      thankYou: "तपाईंको बुकिङको लागि धन्यवाद। तपाईंलाई छिट्टै पुष्टिकरण ईमेल प्राप्त हुनेछ।",
      close: "बन्द गर्नुहोस्"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  const tourOptions = [
    { id: 'virtual', name: t.virtualTour, price: '$25', duration: '2 hours' },
    { id: 'guided', name: t.guidedTour, price: '$65', duration: '4 hours' },
    { id: 'cultural', name: t.culturalExperience, price: '$85', duration: '6 hours' },
    { id: 'retreat', name: t.meditationRetreat, price: '$150', duration: '2 days' }
  ];

  const timeSlots = [
    '09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM'
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">{t.tourType}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tourOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleInputChange('tourType', option.id)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    bookingData.tourType === option.id
                      ? 'border-monastery-primary bg-monastery-primary bg-opacity-10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{option.name}</h4>
                    <span className="text-monastery-primary font-semibold">{option.price}</span>
                  </div>
                  <p className="text-sm text-gray-600">{option.duration}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  {t.selectDate}
                </label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monastery-primary focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  {t.selectTime}
                </label>
                <select
                  value={bookingData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monastery-primary focus:border-transparent"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="h-4 w-4 inline mr-1" />
                {t.numberOfVisitors}
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={bookingData.visitors}
                onChange={(e) => handleInputChange('visitors', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monastery-primary focus:border-transparent"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">{t.personalInfo}</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.fullName}</label>
                <input
                  type="text"
                  value={bookingData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monastery-primary focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.email}</label>
                <input
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monastery-primary focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.phone}</label>
              <input
                type="tel"
                value={bookingData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monastery-primary focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.specialRequests}</label>
              <textarea
                value={bookingData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monastery-primary focus:border-transparent resize-none"
                placeholder="Any special requirements or requests?"
              ></textarea>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">{t.paymentMethod}</h3>
            
            <div className="space-y-3">
              {[
                { id: 'card', name: t.creditCard, icon: CreditCard },
                { id: 'paypal', name: t.paypal, icon: CreditCard },
                { id: 'bank', name: t.bankTransfer, icon: CreditCard }
              ].map((method) => (
                <div key={method.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    className="mr-3"
                    defaultChecked={method.id === 'card'}
                  />
                  <method.icon className="h-5 w-5 mr-2 text-gray-600" />
                  <span className="font-medium text-gray-900">{method.name}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t pt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.cardNumber}</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monastery-primary focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.cardholderName}</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monastery-primary focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.expiryDate}</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monastery-primary focus:border-transparent"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.cvv}</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monastery-primary focus:border-transparent"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-50 rounded-lg p-4 border-t">
              <h4 className="font-semibold text-gray-900 mb-3">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tour Type:</span>
                  <span>{tourOptions.find(t => t.id === bookingData.tourType)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span>{bookingData.date} at {bookingData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Visitors:</span>
                  <span>{bookingData.visitors}</span>
                </div>
                <div className="flex justify-between font-semibold text-monastery-primary border-t pt-2">
                  <span>Total:</span>
                  <span>{tourOptions.find(t => t.id === bookingData.tourType)?.price}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">{t.bookingConfirmed}</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">{t.bookingId}</p>
              <p className="text-lg font-mono font-semibold text-monastery-primary">MNS-{Date.now().toString().slice(-6)}</p>
            </div>
            <p className="text-gray-600">{t.thankYou}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{t.title}</h2>
            <p className="text-sm text-gray-600">
              {step === 1 && t.step1}
              {step === 2 && t.step2}
              {step === 3 && t.step3}
              {step === 4 && t.step4}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Bar */}
        {step < 4 && (
          <div className="px-6 py-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-monastery-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-between">
          {step < 4 ? (
            <>
              <button
                onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {step === 1 ? t.cancel : t.back}
              </button>
              <button
                onClick={() => step < 3 ? setStep(step + 1) : setStep(4)}
                className="bg-monastery-primary hover:bg-monastery-secondary text-white px-6 py-2 rounded-lg transition-colors"
                disabled={
                  (step === 1 && (!bookingData.tourType || !bookingData.date || !bookingData.time)) ||
                  (step === 2 && (!bookingData.name || !bookingData.email || !bookingData.phone))
                }
              >
                {step === 3 ? t.confirm : t.next}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="mx-auto bg-monastery-primary hover:bg-monastery-secondary text-white px-6 py-2 rounded-lg transition-colors"
            >
              {t.close}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;