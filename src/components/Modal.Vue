<template>
    <div>
        <div :id="`bootstrapModal-${modalId}`" class="modal fade text-black" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <slot name="modal-header">
                            <h5 class="modal-title">Modal title</h5>
                        </slot>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <slot name="modal-body"></slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="modal-footer">
                            <button type="button" class="btn btn-default" @click="closeModal">Close</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {watch} from 'vue';

const props = defineProps({
    showModal: {
        type: Boolean,
        default: false
    }
});

const modalId = Math.random().toString().slice(2);
 watch(
    () => props.showModal, 
    (newValue) => {
        if ( newValue ) {
            // eslint-disable-next-line no-undef
            $(`#bootstrapModal-${modalId}`).modal('show');
        } else {
            // eslint-disable-next-line no-undef
            $(`#bootstrapModal-${modalId}`).modal('hide');
        }
    }
)

const emits = defineEmits(['closeModal'])

const closeModal = () => {
    emits('closeModal')
}

</script>