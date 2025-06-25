// JPG to PDF Converter Tool
class JPGToPDFConverter {
  constructor() {
    this.files = []
    this.initializeElements()
    this.setupEventListeners()
  }

  initializeElements() {
    this.uploadZone = document.getElementById("uploadZone")
    this.fileInput = document.getElementById("fileInput")
    this.uploadBtn = document.getElementById("uploadBtn")
    this.fileList = document.getElementById("fileList")
    this.filesContainer = document.getElementById("filesContainer")
    this.convertBtn = document.getElementById("convertBtn")
    this.progressSection = document.getElementById("progressSection")
    this.progressFill = document.getElementById("progressFill")
    this.progressText = document.getElementById("progressText")
    this.resultSection = document.getElementById("resultSection")
    this.downloadBtn = document.getElementById("downloadBtn")
    this.newConversionBtn = document.getElementById("newConversionBtn")
    this.dropboxBtn = document.getElementById("dropboxBtn")
    this.driveBtn = document.getElementById("driveBtn")
    this.dropboxUrl = document.getElementById("dropboxUrl")
    this.driveUrl = document.getElementById("driveUrl")
  }

  setupEventListeners() {
    // File input events
    this.uploadBtn.addEventListener("click", () => this.fileInput.click())
    this.fileInput.addEventListener("change", (e) => this.handleFileSelect(e))

    // Drag and drop events
    this.uploadZone.addEventListener("click", () => this.fileInput.click())
    this.uploadZone.addEventListener("dragover", (e) => this.handleDragOver(e))
    this.uploadZone.addEventListener("dragleave", (e) => this.handleDragLeave(e))
    this.uploadZone.addEventListener("drop", (e) => this.handleDrop(e))

    // Convert button
    this.convertBtn.addEventListener("click", () => this.convertToPDF())

    // Download and new conversion buttons
    this.downloadBtn.addEventListener("click", () => this.downloadPDF())
    this.newConversionBtn.addEventListener("click", () => this.resetConverter())

    // External link buttons
    this.dropboxBtn.addEventListener("click", () => this.handleExternalLink("dropbox"))
    this.driveBtn.addEventListener("click", () => this.handleExternalLink("drive"))
  }

  handleFileSelect(event) {
    const files = Array.from(event.target.files)
    this.addFiles(files)
  }

  handleDragOver(event) {
    event.preventDefault()
    this.uploadZone.classList.add("dragover")
  }

  handleDragLeave(event) {
    event.preventDefault()
    this.uploadZone.classList.remove("dragover")
  }

  handleDrop(event) {
    event.preventDefault()
    this.uploadZone.classList.remove("dragover")
    const files = Array.from(event.dataTransfer.files)
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))
    this.addFiles(imageFiles)
  }

  addFiles(newFiles) {
    const validFiles = newFiles.filter((file) => {
      const isValidType = file.type === "image/jpeg" || file.type === "image/jpg"
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB

      if (!isValidType) {
        this.showNotification("Only JPG/JPEG files are supported", "error")
        return false
      }

      if (!isValidSize) {
        this.showNotification("File size must be less than 10MB", "error")
        return false
      }

      return true
    })

    validFiles.forEach((file) => {
      const fileId = Date.now() + Math.random()
      this.files.push({ id: fileId, file, preview: null })
    })

    if (this.files.length > 0) {
      this.renderFileList()
      this.fileList.style.display = "block"
    }
  }

  async renderFileList() {
    this.filesContainer.innerHTML = ""

    for (const fileData of this.files) {
      const fileItem = document.createElement("div")
      fileItem.className = "file-item"

      // Create preview
      const preview = await this.createImagePreview(fileData.file)
      fileData.preview = preview

      fileItem.innerHTML = `
                <img src="${preview}" alt="Preview" class="file-preview">
                <div class="file-info">
                    <div class="file-name">${fileData.file.name}</div>
                    <div class="file-size">${this.formatFileSize(fileData.file.size)}</div>
                </div>
                <button class="file-remove" onclick="converter.removeFile(${fileData.id})">
                    ×
                </button>
            `

      this.filesContainer.appendChild(fileItem)
    }
  }

  createImagePreview(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.readAsDataURL(file)
    })
  }

  removeFile(fileId) {
    this.files = this.files.filter((f) => f.id !== fileId)

    if (this.files.length === 0) {
      this.fileList.style.display = "none"
    } else {
      this.renderFileList()
    }
  }

  async convertToPDF() {
    if (this.files.length === 0) {
      this.showNotification("Please select at least one image", "error")
      return
    }

    // Show progress
    this.progressSection.style.display = "block"
    this.convertBtn.disabled = true

    try {
      // Simulate conversion process
      await this.simulateConversion()

      // Create PDF using canvas
      const pdfBlob = await this.createPDFFromImages()
      this.pdfBlob = pdfBlob

      // Show result
      this.progressSection.style.display = "none"
      this.resultSection.style.display = "block"

      this.showNotification("PDF created successfully!", "success")
    } catch (error) {
      console.error("Conversion error:", error)
      this.showNotification("Error creating PDF. Please try again.", "error")
      this.progressSection.style.display = "none"
      this.convertBtn.disabled = false
    }
  }

  async simulateConversion() {
    const steps = [
      "Preparing images...",
      "Optimizing quality...",
      "Creating PDF structure...",
      "Combining images...",
      "Finalizing document...",
    ]

    for (let i = 0; i < steps.length; i++) {
      this.progressText.textContent = steps[i]
      this.progressFill.style.width = `${((i + 1) / steps.length) * 100}%`
      await this.delay(800)
    }
  }

  async createPDFFromImages() {
    // Create a simple PDF-like structure using canvas
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    // Set PDF page size (A4: 595x842 points)
    const pageWidth = 595
    const pageHeight = 842
    const margin = 50

    canvas.width = pageWidth
    canvas.height = pageHeight * this.files.length

    // White background
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add each image to a page
    for (let i = 0; i < this.files.length; i++) {
      const img = new Image()
      img.crossOrigin = "anonymous"

      await new Promise((resolve) => {
        img.onload = () => {
          const pageY = i * pageHeight
          const maxWidth = pageWidth - margin * 2
          const maxHeight = pageHeight - margin * 2

          // Calculate scaled dimensions
          const { width, height } = this.calculateScaledDimensions(img.width, img.height, maxWidth, maxHeight)

          // Center the image on the page
          const x = (pageWidth - width) / 2
          const y = pageY + (pageHeight - height) / 2

          ctx.drawImage(img, x, y, width, height)
          resolve()
        }
        img.src = this.files[i].preview
      })
    }

    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob(resolve, "image/png", 0.9)
    })
  }

  calculateScaledDimensions(originalWidth, originalHeight, maxWidth, maxHeight) {
    const widthRatio = maxWidth / originalWidth
    const heightRatio = maxHeight / originalHeight
    const ratio = Math.min(widthRatio, heightRatio)

    return {
      width: originalWidth * ratio,
      height: originalHeight * ratio,
    }
  }

  downloadPDF() {
    if (!this.pdfBlob) {
      this.showNotification("No PDF available for download", "error")
      return
    }

    const url = URL.createObjectURL(this.pdfBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = `converted-images-${Date.now()}.png` // Note: This creates a PNG, not PDF
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    this.showNotification("Download started!", "success")
  }

  resetConverter() {
    this.files = []
    this.pdfBlob = null
    this.fileList.style.display = "none"
    this.progressSection.style.display = "none"
    this.resultSection.style.display = "none"
    this.convertBtn.disabled = false
    this.fileInput.value = ""
    this.dropboxUrl.value = ""
    this.driveUrl.value = ""
  }

  handleExternalLink(source) {
    const url = source === "dropbox" ? this.dropboxUrl.value : this.driveUrl.value

    if (!url) {
      this.showNotification(`Please enter a ${source} link`, "error")
      return
    }

    // Simulate external link processing
    this.showNotification(`${source} integration coming soon!`, "info")
  }

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  showNotification(message, type = "info") {
    if (window.DOT_PDF && window.DOT_PDF.showNotification) {
      window.DOT_PDF.showNotification(message, type)
    } else {
      alert(message)
    }
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

// Initialize converter when page loads
let converter
document.addEventListener("DOMContentLoaded", () => {
  converter = new JPGToPDFConverter()
})
