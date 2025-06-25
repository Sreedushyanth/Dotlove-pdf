// Tool data
const toolsData = [
  // Image Tools
  {
    id: "image-converter",
    name: "Image Converter",
    description: "Convert images between different formats (JPG, PNG, WebP, etc.)",
    category: "image",
    icon: "image",
    url: "tools/image-converter.html",
  },
  {
    id: "image-compressor",
    name: "Image Compressor",
    description: "Reduce image file size while maintaining quality",
    category: "image",
    icon: "compress",
    url: "tools/image-compressor.html",
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to specific dimensions or percentages",
    category: "image",
    icon: "resize",
    url: "tools/image-resizer.html",
  },
  {
    id: "image-cropper",
    name: "Image Cropper",
    description: "Crop images to focus on specific areas",
    category: "image",
    icon: "crop",
    url: "tools/image-cropper.html",
  },
  // PDF Tools
  {
    id: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDF files into a single document",
    category: "pdf",
    icon: "merge",
    url: "tools/merge-pdf.html",
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    description: "Split PDF files into separate pages or sections",
    category: "pdf",
    icon: "split",
    url: "tools/split-pdf.html",
  },
  {
    id: "compress-pdf",
    name: "Compress PDF",
    description: "Reduce PDF file size for easier sharing",
    category: "pdf",
    icon: "compress",
    url: "tools/compress-pdf.html",
  },
  {
    id: "jpg-to-pdf",
    name: "JPG to PDF",
    description: "Convert JPG images to PDF documents",
    category: "pdf",
    icon: "convert",
    url: "tools/jpg-to-pdf.html",
  },
  // Calculator Tools
  {
    id: "scientific-calculator",
    name: "Scientific Calculator",
    description: "Advanced calculator with scientific functions",
    category: "calculator",
    icon: "calculator",
    url: "tools/scientific-calculator.html",
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate age in years, months, and days",
    category: "calculator",
    icon: "calendar",
    url: "tools/age-calculator.html",
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate Body Mass Index and health status",
    category: "calculator",
    icon: "health",
    url: "tools/bmi-calculator.html",
  },
  // Text Tools
  {
    id: "text-converter",
    name: "Text Case Converter",
    description: "Convert text between different cases (upper, lower, title)",
    category: "text",
    icon: "text",
    url: "tools/text-converter.html",
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, and paragraphs in text",
    category: "text",
    icon: "count",
    url: "tools/word-counter.html",
  },
  {
    id: "text-encryptor",
    name: "Text Encryptor",
    description: "Encrypt and decrypt text using various algorithms",
    category: "text",
    icon: "lock",
    url: "tools/text-encryptor.html",
  },
  // Developer Tools
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format and validate JSON data",
    category: "developer",
    icon: "code",
    url: "tools/json-formatter.html",
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder",
    description: "Encode and decode Base64 strings",
    category: "developer",
    icon: "encode",
    url: "tools/base64-encoder.html",
  },
  // Color Tools
  {
    id: "color-picker",
    name: "Color Picker",
    description: "Pick colors from images and convert between formats",
    category: "color",
    icon: "palette",
    url: "tools/color-picker.html",
  },
  {
    id: "gradient-generator",
    name: "Gradient Generator",
    description: "Create beautiful CSS gradients",
    category: "color",
    icon: "gradient",
    url: "tools/gradient-generator.html",
  },
  // Utility Tools
  {
    id: "qr-generator",
    name: "QR Code Generator",
    description: "Generate QR codes for text, URLs, and more",
    category: "utility",
    icon: "qr",
    url: "tools/qr-generator.html",
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Generate secure random passwords",
    category: "utility",
    icon: "key",
    url: "tools/password-generator.html",
  },
]

// Icon SVGs
const icons = {
  image:
    '<path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>',
  compress:
    '<path d="M8 2v4l-2.5-2.5L3 6l3 3h4V2H8zM2 8v8h8v-4l-2.5 2.5L5 12l3-3V8H2zM16 2v7l3-3 2.5 2.5L24 6l-3-3h-4v4l2.5-2.5zM16 16v8h8v-7l-3 3-2.5-2.5L16 16z"/>',
  resize: '<path d="M3 3h6v2H5v4H3V3zm0 10v6h6v-2H5v-4H3zm8 6h6v-2h-4v-4h-2v6zm8-16v6h-2V5h-4V3h6z"/>',
  crop: '<path d="M7 17h10V7h2V5h-2V3h-2v2H9V3H7v2H5v2h2v10zm2-8h6v6H9V9z"/>',
  merge: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.11 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>',
  split:
    '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.11 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-9-7v2h6v-2H9z"/>',
  convert: '<path d="M12 2l3.09 6.26L22 9l-5.91 3.74L18 19l-6-4.74L6 19l1.91-6.26L2 9l6.91-1.74L12 2z"/>',
  calculator:
    '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2v-2h2v2zm0-4h-2v-2h2v2zm-4 4H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V7h2v2zm4 0h-2V7h2v2zm4 8h-2v-6h2v6zm0-8h-2V7h2v2z"/>',
  calendar:
    '<path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>',
  health:
    '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
  text: '<path d="M5 4v3h5.5v12h3V7H19V4z"/>',
  count:
    '<path d="M16 4l4 4-4 4-1.41-1.41L16.17 9H4V7h12.17l-1.58-1.59L16 4zM10 12l-4 4 4 4 1.41-1.41L9.83 17H22v-2H9.83l1.58-1.59L10 12z"/>',
  lock: '<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>',
  code: '<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>',
  encode:
    '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
  palette:
    '<path d="M12 3c-4.97 0-9 4.03-9 9 0 2.5 1.02 4.77 2.68 6.43.94.94 2.07 1.57 3.32 1.57 1.25 0 2.38-.63 3.32-1.57C13.98 16.77 15 14.5 15 12c0-4.97-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>',
  gradient:
    '<path d="M11 9h2v2h-2zm-2 2h2v2H9zm4 0h2v2h-2zm2-2h2v2h-2zM7 9h2v2H7zm12-6H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 18H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm2-7h-2v2h2v-2zm0-2V7h-2v2h2z"/>',
  qr: '<path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 13h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z"/>',
  key: '<path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>',
}

// DOM Elements
const toolsGrid = document.getElementById("toolsGrid")
const loadMoreBtn = document.getElementById("loadMoreBtn")
const sidebarToggle = document.getElementById("sidebarToggle")
const sidebar = document.getElementById("sidebar")
const sidebarClose = document.getElementById("sidebarClose")
const navToggle = document.getElementById("navToggle")
const exploreTools = document.getElementById("exploreTools")

// State
let displayedTools = 0
const toolsPerPage = 8

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadTools()
  setupEventListeners()
})

// Load tools into grid
function loadTools() {
  const toolsToShow = toolsData.slice(displayedTools, displayedTools + toolsPerPage)

  toolsToShow.forEach((tool) => {
    const toolCard = createToolCard(tool)
    toolsGrid.appendChild(toolCard)
  })

  displayedTools += toolsToShow.length

  if (displayedTools >= toolsData.length) {
    loadMoreBtn.style.display = "none"
  }
}

// Create tool card element
function createToolCard(tool) {
  const card = document.createElement("div")
  card.className = "tool-card"
  card.onclick = () => openTool(tool.url)

  card.innerHTML = `
        <div class="tool-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
                ${icons[tool.icon] || icons.image}
            </svg>
        </div>
        <h3>${tool.name}</h3>
        <p>${tool.description}</p>
    `

  return card
}

// Open tool page
function openTool(url) {
  window.location.href = url
}

// Setup event listeners
function setupEventListeners() {
  // Load more tools
  loadMoreBtn.addEventListener("click", loadTools)

  // Sidebar toggle
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active")
  })

  // Sidebar close
  sidebarClose.addEventListener("click", () => {
    sidebar.classList.remove("active")
  })

  // Close sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove("active")
    }
  })

  // Explore tools button
  exploreTools.addEventListener("click", () => {
    document.getElementById("tools").scrollIntoView({ behavior: "smooth" })
  })

  // Mobile navigation toggle
  navToggle.addEventListener("click", () => {
    // Mobile nav functionality can be added here
    console.log("Mobile nav toggle clicked")
  })
}

// Utility functions
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem 2rem",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    zIndex: "9999",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
  })

  // Set background color based on type
  const colors = {
    info: "var(--accent-primary)",
    success: "var(--success-color)",
    warning: "var(--warning-color)",
    error: "var(--error-color)",
  }
  notification.style.background = colors[type] || colors.info

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Search functionality
function searchTools(query) {
  const filteredTools = toolsData.filter(
    (tool) =>
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase()) ||
      tool.category.toLowerCase().includes(query.toLowerCase()),
  )

  toolsGrid.innerHTML = ""
  filteredTools.forEach((tool) => {
    const toolCard = createToolCard(tool)
    toolsGrid.appendChild(toolCard)
  })

  if (filteredTools.length === 0) {
    toolsGrid.innerHTML =
      '<p style="text-align: center; color: var(--text-secondary); grid-column: 1 / -1;">No tools found matching your search.</p>'
  }
}

// Export for use in other files
window.DOT_PDF = {
  showNotification,
  searchTools,
  toolsData,
  icons,
}
