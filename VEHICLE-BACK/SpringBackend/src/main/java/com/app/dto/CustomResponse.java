package com.app.dto;

import javax.annotation.Generated;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomResponse<T> {
    private boolean error;
    private String message;
    private T result;
}