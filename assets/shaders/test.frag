struct VertexOutput {
    @builtin(position) clip_position: vec4<f32>,
    @location(0) norm: vec4<f32>,
};

@group(0) @binding(1) var matcap_texture: texture_cube<f32>;
@group(0) @binding(2) var matcap_sampler: sampler;

@fragment
fn main_gooch(in: VertexOutput) -> @location(0) vec4<f32> {
    //return vec4<f32>(1.0, 0.0, 0.0, 1.0);
    let surface = vec3<f32>(1.0, 0.0, 0.0);
    let cool = vec3<f32>(0.0, 0.0, 0.55) + (0.25 * surface);
    let warm = vec3<f32>(0.3, 0.3, 0.0) + (0.25 * surface);
    let highlight = vec3<f32>(1.0, 1.0, 1.0);

    let view = vec4<f32>(0.0, 0.0, 1.0, 0.0);
    let light = vec4<f32>(1.0, 0.0, 0.0, 0.0);
    let normal = normalize(in.norm);

    let t = (dot(normal, light) + 1)/2;
    let r = (2 * dot(normal, light)) * normal - light;
    let s = clamp(100 * dot(r, view) - 97, 0.0, 1.0);

    let color = mix(mix(cool, warm, t), highlight, s);

    return vec4<f32>(color, 1.0);
}

@fragment
fn main(in: VertexOutput) -> @location(0) vec4<f32> {
    let view = normalize(vec4<f32>(0) - vec4<f32>(in.clip_position.xyz, 0));
    let normal = in.norm;

    let r = reflect(view, normal) * vec4<f32>(1.0, -1.0, 1.0, 1.0);

    return textureSample(matcap_texture, matcap_sampler, r.xyz);
}