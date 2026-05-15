package com.DonatonProyect.Bff.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class DonationRequest {

    @NotBlank(message = "El nombre del recurso es obligatorio")
    private String resourceName;

    @NotBlank(message = "El tipo de recurso es obligatorio")
    private String resourceType;

    @NotBlank(message = "El tipo de donante es obligatorio")
    private String donorType;

    @NotNull(message = "La cantidad es obligatoria")
    private Integer quantity;

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public String getResourceType() {
        return resourceType;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    public String getDonorType() {
        return donorType;
    }

    public void setDonorType(String donorType) {
        this.donorType = donorType;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
