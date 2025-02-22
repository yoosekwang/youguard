<template>
  <div class="grid grid-cols-1 md:grid-cols-3 md:mt-4 md:mt-8 max-w-6xl mx-auto">
    <div class="container col-span-2 p-4 pt-2 md:pt-4">
      <!-- <h1 class="text-lg md:text-3xl font-bold mb-2 md:mb-6">{{ isNewEdit ? 'New Watermark' : 'Edit Watermark' }}</h1> -->

      <!-- Canvas for Image Preview -->
      <div class="md:mb-6 relative">
        <canvas ref="canvas" class="w-full border border-gray-300 rounded-md" :style="{ minHeight: `calc(100vh - 200px - ${actionDivHeight}px)` }"></canvas>
        <div style="visibility: hidden;" class="absolute w-full h-full top-0 left-0 flex items-center justify-center">
          <div ref="watermarkPlaceholder" :style="{
          fontSize: `${textStyle.fontSize}px`,
          fontWeight: textStyle.fontWeight,
          fontStyle: textStyle.fontStyle,
          color: textStyle.color,
          cursor: 'move',
          userSelect: 'none',
          opacity: 0.4,
        }">
          {{ watermarkText }}
        </div>
        </div>
        <div v-if="watermarkType === 'text' && watermarkLoaded == true" ref="textWatermark" :style="{
          position: 'absolute',
          left: `${watermarkPosition.x}px`,
          top: `${watermarkPosition.y}px`,
          fontSize: `${textStyle.fontSize}px`,
          fontWeight: textStyle.fontWeight,
          fontStyle: textStyle.fontStyle,
          color: textStyle.color,
          cursor: 'move',
          userSelect: 'none',
          opacity: 0.4
        }" @mousedown="startDragging" @touchstart="startDragging">
          {{ watermarkText }}
        </div>
        <img v-else-if="watermarkType === 'image' && watermarkImage" ref="imageWatermark" :src="watermarkImage" :style="{
          position: 'absolute',
          left: `${watermarkPosition.x}px`,
          top: `${watermarkPosition.y}px`,
          width: '100px',
          cursor: 'move',
          userSelect: 'none'
        }" @mousedown="startDragging" @touchstart="startDragging">
      </div>

      <div class="md:hidden" :style="{ marginBottom: actionDivHeight + 'px' }"></div>

      <div class="fixed md:static bottom-0 left-0 p-3 bg-white w-full" ref="actiondiv">

        <!-- Image Upload -->
        <!-- <div class="mb-6 hidden md:block">
        <label class="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
        <input type="file" @change="handleImageUpload" accept="image/*" class="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
      " />
      </div> -->
        <!-- Image Upload -->
        <div class="mb-6 mt-3 flex items-center justify-center">
          <!-- <label class="block text-sm font-medium text-gray-700 mb-2">Upload Image</label> -->
          <label role="button" for="bg-image"
            class="min-w-[130px] text-center text-sm font-semibold text-violet-700 bg-violet-100 px-3 py-2 rounded-full">
            <input id="bg-image" type="file" @change="handleImageUpload" accept="image/*" class="hidden w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100
          " />
            Upload Image
          </label>
          <div class="mx-1"></div>
          <button @click="() => removeImage()" type="button"
            class="min-w-[130px] text-center text-sm font-semibold text-violet-700 bg-violet-100 px-3 py-2 rounded-full">Delete</button>
        </div>

        <!-- Watermark Options -->
        <!-- <div class="mb-2 md:mb-6 flex align-items-center items-center md:block">
        <label class="block text-sm font-medium text-gray-700 md:mb-2">Watermark Type:</label>
        <div class="mx-2"></div>
        <div class="flex space-x-4">
          <button @click="watermarkType = 'text'" :class="{ 'bg-violet-600 text-white': watermarkType === 'text' }"
            class="px-4 py-2 flex items-center rounded-md border border-violet-600 text-violet-600 hover:bg-violet-50">
            <Icon icon="mdi:format-text" class="md:mr-2" />
            <span class="hidden md:block">Text</span>
          </button>
          <button @click="watermarkType = 'image'" :class="{ 'bg-violet-600 text-white': watermarkType === 'image' }"
            class="px-4 py-2 flex items-center rounded-md border border-violet-600 text-violet-600 hover:bg-violet-50">
            <Icon icon="mdi:image" class="md:mr-2" />
            <span class="hidden md:block">Image</span>
          </button>
        </div>
      </div> -->

        <!-- Text Watermark Options -->
        <div v-if="watermarkType === 'text'" class="mb-6">
          <!-- <label class="block text-sm font-medium text-gray-700 mb-2 hidden md:block">Watermark Text</label>
        <input v-model="watermarkText" type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
          placeholder="Enter watermark text"> -->

          <div class="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Font Size</label>

              <div class="w-full py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg "
                data-hs-input-number="">
                <div class="flex items-center justify-between gap-x-1.5">
                  <button @click="() => updateFontSize('-')" type="button"
                    class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
                    tabindex="-1" aria-label="Decrease" data-hs-input-number-decrement="">
                    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round">
                      <path d="M5 12h14"></path>
                    </svg>
                  </button>
                  <input v-model="textStyle.fontSize"
                    class="max-w-[100px] bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    style="-moz-appearance: textfield;padding: 0;" type="number" aria-roledescription="Number field"
                    disabled>
                  <button @click="() => updateFontSize('+')" type="button"
                    class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
                    tabindex="-1" aria-label="Increase" data-hs-input-number-increment="">
                    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Font Color</label>
              <input v-model="textStyle.color" type="color"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50">
            </div>
            <!-- <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Font Weight</label>
            <select v-model="textStyle.fontWeight"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50">
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Font Style</label>
            <select v-model="textStyle.fontStyle"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50">
              <option value="normal">Normal</option>
              <option value="italic">Italic</option>
            </select>
          </div> -->
          </div>
        </div>

        <!-- Image Watermark Options -->
        <div v-if="watermarkType === 'image'" class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2 hidden md:block">Upload Watermark Image</label>
          <input type="file" @change="handleWatermarkImageUpload" accept="image/*" class="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
      " />
        </div>



        <!-- Action Buttons -->
        <div class="flex justify-center space-x-4">
          <button @click="saveDraft"
            class="px-4 py-2 flex items-center bg-violet-600 text-white rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
            <Icon icon="mdi:content-save" class="mr-2" />
            {{ isNewEdit ? 'Save Draft' : 'Update Draft' }}
          </button>
          <button @click="downloadImage"
            class="px-4 py-2 flex items-center bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            <Icon icon="mdi:download" class="mr-2" />
            Download
          </button>
        </div>

      </div>


    </div>


    <!-- <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl font-medium ">Your Drafts</h1>
        <NuxtLink to="/drafts" class="inline-block  flex items-center text-violet-600">

          See All Drafts
        </NuxtLink>
      </div>
      <div v-if="loading" class="text-center">
        <p class="text-lg">Loading drafts...</p>
      </div>
      <div v-else-if="error" class="text-center text-red-600">
        <p class="text-lg">Error loading drafts. Please try again.</p>
      </div>
      <div v-else class="grid grid-cols-1 gap-6">
        <div v-for="draft in drafts" :key="draft.id"
          class="border rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow">
          <img :src="draft.baseImage" alt="Draft preview" class="w-full h-48 object-cover mb-4 rounded">
          <div class="flex items-center justify-between w-full">
            <NuxtLink :to="`/edit/${draft.id}`" class="inline-block flex items-center text-violet-600">
              <Icon icon="mdi:pencil" class="mr-2" />
              Edit Draft
            </NuxtLink>

            <button @click="deleteDraft(draft.id)" class="text-red-600 p-4 rounded">
              <Icon icon="material-symbols:delete-outline-rounded" width="1.5em" height="1.5em" />
            </button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js'
import axios from 'axios'
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useFirebase } from '~/composables/useFirebase'



const route = useRoute()
const router = useRouter()
const { saveDraftToFirebase, getDraftFromFirebase, updateDraftInFirebase, removeDraftFromFirebase } = useFirebase()

const draftId = computed(() => route.params.id)
const isNewEdit = computed(() => !draftId.value)

const actiondiv = ref(null)
const actionDivHeight = ref(0); 
const canvas = ref(null)
const ctx = ref(null)
const baseImage = ref(null)
const watermarkType = ref('text')
const watermarkText = ref('you guard')
const watermarkImage = ref(null)
const watermarkPosition = reactive({ x: 50, y: 50 })
const isDragging = ref(false)
const dragOffset = reactive({ x: 0, y: 0 })
const textStyle = reactive({
  fontSize: 24,
  color: '#000000',
  fontWeight: 'normal',
  fontStyle: 'normal'
})

const watermarkPlaceholder = ref(null)
const watermarkLoaded = ref(false)
const textWatermark = ref(null)
const imageWatermark = ref(null)

const loadDraft = async (id) => {
  try {
    const draft = await getDraftFromFirebase(id)
    if (draft) {
      baseImage.value = new Image()
      baseImage.value.onload = () => {
        drawImage()
      }
      baseImage.value.src = draft.baseImage
      watermarkType.value = draft.watermarkType
      watermarkText.value = draft.watermarkText
      watermarkImage.value = draft.watermarkImage
      watermarkPosition.x = draft.watermarkPosition.x
      watermarkPosition.y = draft.watermarkPosition.y
      Object.assign(textStyle, draft.textStyle)
    }
  } catch (error) {
    console.error('Error loading draft:', error)
  }
}

onMounted(() => {
  ctx.value = canvas.value.getContext('2d')
  window.addEventListener('mousemove', drag)
  window.addEventListener('mouseup', stopDragging)
  window.addEventListener('touchmove', drag)
  window.addEventListener('touchend', stopDragging)

  if (draftId.value) {
    loadDraft(draftId.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', drag)
  window.removeEventListener('mouseup', stopDragging)
  window.removeEventListener('touchmove', drag)
  window.removeEventListener('touchend', stopDragging)
})

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      baseImage.value = new Image()
      baseImage.value.onload = () => {
        drawImage()
      }
      baseImage.value.src = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleWatermarkImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      watermarkImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const drawImage = () => {
  if (baseImage.value) {
    canvas.value.width = baseImage.value.width
    canvas.value.height = baseImage.value.height
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
    ctx.value.drawImage(baseImage.value, 0, 0)
  }
}

const startDragging = (event) => {
  isDragging.value = true
  const clientX = event.clientX || event.touches[0].clientX
  const clientY = event.clientY || event.touches[0].clientY
  const rect = event.target.getBoundingClientRect()
  dragOffset.x = clientX - rect.left
  dragOffset.y = clientY - rect.top
}

const drag = (event) => {
  if (isDragging.value) {
    event.preventDefault()
    const clientX = event.clientX || event.touches[0].clientX
    const clientY = event.clientY || event.touches[0].clientY
    const canvasRect = canvas.value.getBoundingClientRect()

    watermarkPosition.x = Math.min(
      Math.max(clientX - canvasRect.left - dragOffset.x, 0),
      canvasRect.width - (watermarkType.value === 'image' ? 100 : 0)
    )
    watermarkPosition.y = Math.min(
      Math.max(clientY - canvasRect.top - dragOffset.y, 0),
      canvasRect.height - (watermarkType.value === 'image' ? 100 : 0)
    )
  }
}

const stopDragging = () => {
  isDragging.value = false
}

const userDetails = ref({})


const fetchUserDetails = async () => {
  try {
    const token = localStorage.getItem("accessToken")
    const response = await axios.get("/api/user/details",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    userDetails.value = response.data.userDetails;
    console.log("User details", userDetails);

  } catch (err) {
    console.error(err);

  }
}


// onMounted(fetchUserDetails)
onMounted(() => {
  // Get the height of the div when the component is mounted
  actionDivHeight.value = actiondiv.value.clientHeight;
  fetchUserDetails();

  setTimeout(function(){
    // Calculate the top and left positions to center the child div
    watermarkPosition.x = watermarkPlaceholder.value.offsetLeft;
    watermarkPosition.y = watermarkPlaceholder.value.offsetTop;
    watermarkLoaded.value = true;
  }, 1000);

});

const saveDraft = async () => {
  const user = await userService.getUserDetails()
  console.log(user.Email);

  const draft = {
    baseImage: baseImage.value.src,
    watermarkType: watermarkType.value,
    watermarkText: watermarkText.value,
    watermarkImage: watermarkImage.value,
    watermarkPosition,
    textStyle,
    email: user.Email
  }

  try {
    if (isNewEdit.value) {
      const newDraftId = await saveDraftToFirebase(draft)
      router.push(`/edit/${newDraftId}`)
    } else {
      await updateDraftInFirebase(draftId.value, draft)
    }
    toast.success(isNewEdit.value ? 'Draft saved successfully!' : 'Draft updated successfully!')
  } catch (error) {
    console.error('Error saving draft:', error)
    toast.error('Error saving draft. Please try again.')
  }
}

const deleteDraft = async (id) => {
  try {
    const success = await removeDraftFromFirebase(id);
    if (success) {
      toast.success("Draft deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting draft:", error);
    if (error.message === 'Draft not found') {
      toast.error("Draft not found");
    } else if (error.message === 'Unauthorized to delete this draft') {
      toast.error("You don't have permission to delete this draft");
    } else {
      toast.error("Error deleting draft");
    }
  }
};

const downloadImage = () => {
  // Create a new canvas to avoid modifying the original
  const downloadCanvas = document.createElement('canvas')
  const downloadCtx = downloadCanvas.getContext('2d')

  // Set the download canvas size to match the original canvas
  downloadCanvas.width = canvas.value.width
  downloadCanvas.height = canvas.value.height

  // Draw the base image onto the download canvas
  downloadCtx.drawImage(canvas.value, 0, 0)

  // Calculate the scale factor between the displayed canvas and the actual image size
  const scaleX = canvas.value.width / canvas.value.clientWidth
  const scaleY = canvas.value.height / canvas.value.clientHeight

  // Apply the watermark
  if (watermarkType.value === 'text') {

    const scale = Math.max(scaleX, scaleY);
    const fontSize = textStyle.fontSize * scale;

    downloadCtx.font = `${textStyle.fontStyle} ${textStyle.fontWeight} ${fontSize}px Arial`
    downloadCtx.fillStyle = textStyle.color
    downloadCtx.globalAlpha = 0.4;
    const scaledX = watermarkPosition.x * scaleX
    const scaledY = watermarkPosition.y * scaleY+90
    downloadCtx.fillText(watermarkText.value, scaledX, scaledY)
    triggerDownload(downloadCanvas)
  } else if (watermarkType.value === 'image' && watermarkImage.value) {
    const img = new Image()
    img.onload = () => {
      const scaledX = watermarkPosition.x * scaleX
      const scaledY = watermarkPosition.y * scaleY
      const scaledWidth = 100 * scaleX
      const scaledHeight = 100 * scaleY
      downloadCtx.drawImage(img, scaledX, scaledY, scaledWidth, scaledHeight)
      triggerDownload(downloadCanvas)
    }
    img.src = watermarkImage.value
  }
}

// const downloadShowedImage = () => {
//   // Create a new canvas to avoid modifying the original
//   const downloadCanvas = document.createElement('canvas')
//   const downloadCtx = downloadCanvas.getContext('2d')

//   // Set the download canvas size to match the original canvas
//   downloadCanvas.width = canvas.value.clientWidth
//   downloadCanvas.height = canvas.value.clientHeight

//   // Draw the base image onto the download canvas
//   downloadCtx.drawImage(canvas.value, 0, 0, downloadCanvas.width, downloadCanvas.height)
  
//   const fontSize = textStyle.fontSize;
//   downloadCtx.font = `${textStyle.fontStyle} ${textStyle.fontWeight} ${fontSize}px Arial`
//   downloadCtx.fillStyle = textStyle.color
//   downloadCtx.globalAlpha = 0.4;
//   const scaledX = watermarkPosition.x
//   const scaledY = watermarkPosition.y+25
//   downloadCtx.fillText(watermarkText.value, scaledX, scaledY)
//   triggerDownload(downloadCanvas)
// }

const triggerDownload = (canvas) => {
  const link = document.createElement('a')
  link.download = 'watermarked-image.png'
  link.href = canvas.toDataURL()
  link.click()
}


const updateFontSize = (operator) => {

  if (operator === '+') {
    textStyle.fontSize += 1;
  } else {
    if (textStyle.fontSize > 8) {
      textStyle.fontSize -= 1;
    }
  }

}

const removeImage = () => {
  const canv = canvas.value;
  const ctx = canv.getContext("2d");

  // Clear the entire canvas
  ctx.clearRect(0, 0, canv.width, canv.height);
  canvas.value.height = `calc(100vh - 200px - ${actionDivHeight}px)`;
  watermarkPosition.x = watermarkPlaceholder.value.offsetLeft;
  watermarkPosition.y = watermarkPlaceholder.value.offsetTop;
};

const { getDraftsFromFirebase } = useFirebase()
const drafts = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    drafts.value = await getDraftsFromFirebase(userDetails.Email)
  } catch (e) {
    console.error('Error fetching drafts:', e)
    error.value = e
  } finally {
    loading.value = false
  }
})
</script>


<style >
html,body {
  overscroll-behavior: none;
}
input {
  padding: 10px;
}

select {
  padding: 10px;
}
</style>