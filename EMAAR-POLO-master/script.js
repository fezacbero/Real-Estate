$(document).ready(() => {
  // Your existing code (navbar, forms, etc.) stays the same...
  $(window).scroll(() => {
    if ($(window).scrollTop() > 50) {
      $(".navbar").addClass("scrolled")
    } else {
      $(".navbar").removeClass("scrolled")
    }
    
    if ($(window).scrollTop() > 300) {
      $(".back-to-top").addClass("active")
    } else {
      $(".back-to-top").removeClass("active")
    }
  })

  // DEBUGGING MODAL AUTO-POPUP
  console.log('🔍 Modal Debug: Document ready');
  
  // Check if modal exists
  const modalExists = $('#contactModal').length > 0;
  console.log('🔍 Modal exists:', modalExists);
  
  // Check session storage
  const modalShown = sessionStorage.getItem('modalShown');
  const popupShown = sessionStorage.getItem('popupShown');
  const popupDismissed = sessionStorage.getItem('popupDismissed');
  const userRegistered = localStorage.getItem('userRegistered');
  
  console.log('🔍 Session Storage Check:', {
    modalShown: modalShown,
    popupShown: popupShown,
    popupDismissed: popupDismissed,
    userRegistered: userRegistered
  });

  // CLEAR ALL PREVIOUS SESSION DATA (for testing)
  // Uncomment these lines to reset everything:
  // sessionStorage.removeItem('modalShown');
  // sessionStorage.removeItem('popupShown');
  // sessionStorage.removeItem('popupDismissed');
  // localStorage.removeItem('userRegistered');
  // console.log('🔍 Cleared all session data');

  // AUTO-POPUP LOGIC - SIMPLIFIED AND DEBUGGED
  setTimeout(function() {
    console.log('🔍 2 second timeout reached');
    
    // Check if modal element exists
    if (!$('#contactModal').length) {
      console.error('❌ Modal #contactModal not found in DOM');
      return;
    }
    
    // Check if already shown
    if (sessionStorage.getItem('modalShown') || 
        sessionStorage.getItem('popupShown') || 
        sessionStorage.getItem('popupDismissed') ||
        localStorage.getItem('userRegistered')) {
      console.log('🔍 Modal blocked by session storage');
      return;
    }
    
    console.log('✅ Showing modal now...');
    
    try {
      // Try Bootstrap 5 method first
      if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        console.log('🔍 Using Bootstrap 5 Modal');
        const contactModal = new bootstrap.Modal(document.getElementById('contactModal'));
        contactModal.show();
      } 
      // Fallback to jQuery/Bootstrap 4 method
      else if ($.fn.modal) {
        console.log('🔍 Using jQuery Modal');
        $('#contactModal').modal('show');
      } 
      else {
        console.error('❌ No modal method available');
        return;
      }
      
      // Mark as shown
      sessionStorage.setItem('modalShown', 'true');
      console.log('✅ Modal should be visible now');
      
    } catch (error) {
      console.error('❌ Error showing modal:', error);
    }
  }, 2000);

  // MODAL EVENT HANDLERS
  $('#contactModal').on('show.bs.modal', function() {
    console.log('✅ Modal is showing');
  });

  $('#contactModal').on('shown.bs.modal', function() {
    console.log('✅ Modal is fully shown');
  });

  $('#contactModal').on('hide.bs.modal', function() {
    console.log('🔍 Modal is hiding');
  });

  $('#contactModal').on('hidden.bs.modal', function() {
    console.log('🔍 Modal is hidden');
    // Reset form when modal is closed
    $('#contactForm')[0].reset();
  });

  // FORM SUBMISSION HANDLER
  $('#contactModal #contactForm').on('submit', function(e) {
    e.preventDefault();
    console.log('🔍 Form submitted');
    
    const submitBtn = $(this).find('.btn-submit');
    const originalText = submitBtn.html();
    
    // Show loading state
    submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Submitting...');
    submitBtn.prop('disabled', true);
    
    // Get form data
    const formData = {
      name: $(this).find('input[placeholder="Name"]').val(),
      mobile: $(this).find('input[placeholder="Mobile Number"]').val(),
      email: $(this).find('input[placeholder="Email"]').val(),
      budget: $(this).find('select').val()
    };
    
    console.log('🔍 Form data:', formData);
    
    // Simulate form submission
    setTimeout(() => {
      // Reset button
      submitBtn.html('<i class="fas fa-check me-2"></i>Request Sent!');
      
      setTimeout(() => {
        // Hide modal
        $('#contactModal').modal('hide');
        
        // Reset form and button
        $(this)[0].reset();
        submitBtn.html(originalText);
        submitBtn.prop('disabled', false);
        
        // Mark user as registered
        sessionStorage.setItem('userRegistered', 'true');
        
        // Show success message
        alert('Thank you! We will contact you soon.');
      }, 1500);
    }, 2000);
  });

  // MANUAL TRIGGER BUTTONS
  $(document).on('click', '[data-bs-toggle="modal"][data-bs-target="#contactModal"], .trigger-btn', function(e) {
    e.preventDefault();
    console.log('🔍 Manual trigger clicked');
    $('#contactModal').modal('show');
  });

  // Your other existing code (gallery filters, etc.)...
  $(".navbar-nav .nav-link").on("click", () => {
    $(".navbar-collapse").collapse("hide")
  })

  $("#contactForm, #contactFormFull").on("submit", function (e) {
    e.preventDefault()
    const submitBtn = $(this).find(".btn-submit, .btn-submit-full")
    const originalText = submitBtn.html()
    submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...')
    submitBtn.prop("disabled", true)
    
    setTimeout(() => {
      submitBtn.html('<i class="fas fa-check me-2"></i>Request Sent!')
      submitBtn.removeClass("btn-submit btn-submit-full").addClass("btn-success")
      setTimeout(() => {
        submitBtn.html(originalText)
        submitBtn.removeClass("btn-success").addClass("btn-submit btn-submit-full")
        submitBtn.prop("disabled", false)
        $("#contactForm, #contactFormFull")[0].reset()
      }, 2000)
    }, 1500)
  })
});

// ADDITIONAL DEBUGGING - Check when page loads
window.addEventListener('load', function() {
  console.log('🔍 Page fully loaded');
  console.log('🔍 Bootstrap available:', typeof bootstrap !== 'undefined');
  console.log('🔍 jQuery available:', typeof $ !== 'undefined');
  console.log('🔍 Modal element:', document.getElementById('contactModal'));
});